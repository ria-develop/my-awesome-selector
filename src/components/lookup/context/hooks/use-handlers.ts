import {State} from '../../reducer/reducer';
import React, {useCallback, useEffect} from 'react';
import {Action} from '../../reducer/action-types';
import {ActionHandlers} from '../lookup-context-handlers-types';
import {
  createCommitCursorMovementAction,
  createDataSetColumnsAction,
  createDataSetRowsAction,
  createDropdownVisibilityChangeAction,
  createErrorAction,
  createKeyPressAction,
  createMoveCursorToAction,
  createSearchAction, createSearchClearAction,
  createSelectAction,
  createToggleSearchAction
} from '../../reducer/actions';
import {getData} from '../../utils';
import {Column, Cursor, Row} from '../../data/lookup-data-types';
import {LookupContextApi} from '../lookup-context-setup';

export function useHandlers<T>(
  {value, onClear, onSelect, onError, itemToLabel}: LookupContextApi<T>,
  state: State<T>,
  dispatch: React.Dispatch<Action<T>>): ActionHandlers<T> {

  useEffect(handleSelectValue, [dispatch, itemToLabel, value]);
  useEffect(handleErrorEffect, [state.error, onError]);
  useEffect(handleValueEffect, [onSelect, state]);
  useEffect(handleClearEffect, [onClear, state]);

  function handleClearEffect() {
    const {
      lookupValue,
      searchValue,
      error,
      toggleSearchVisible,
      cursor,
      open,
      selectionCursor,
      toggleSearchButtonLabel
    } = state;
    if (!(lookupValue || searchValue || error || toggleSearchButtonLabel || toggleSearchVisible || cursor || open || selectionCursor)) {
      onClear();
    }
  }

  return {
    handleChange: useCallback(handleSearchClear, [dispatch]),
    handleSearch: useCallback(handleSearch, [dispatch]),
    handleToggleSearch: useCallback(handleToggleSearch, [dispatch]),
    handleDropdownVisibleChange: useCallback(handleDropdownVisibleChange, [dispatch]),
    handleCursorMoveTo: useCallback(handleCursorMoveTo, [dispatch]),
    handleCommitCursorMovement: useCallback(handleCommitCursorMovement, [dispatch]),
    handleKeyPress: useCallback(handleKeyPress, [dispatch]),
    handleError: useCallback(handleError, [dispatch]),
    handleSetDataSource: useCallback(handleSetDataSource, [dispatch]),
    handleSetColumns: useCallback(handleSetColumns, [dispatch])
  };

  function handleSetColumns(columns: Column<T>[]) {
    dispatch(createDataSetColumnsAction(columns));
  }

  function handleSetDataSource(rows: Row<T>[]) {
    dispatch(createDataSetRowsAction(rows));
  }

  function handleError(e: Error) {
    dispatch(createErrorAction(e));
  }

  function handleKeyPress(key: string) {
    dispatch(createKeyPressAction(key));
  }

  function handleCommitCursorMovement() {
    dispatch(createCommitCursorMovementAction());
  }

  function handleCursorMoveTo(cursor: Cursor) {
    dispatch(createMoveCursorToAction(cursor));
  }

  function handleDropdownVisibleChange(open: boolean) {
    dispatch(createDropdownVisibilityChangeAction(open));
  }

  function handleToggleSearch() {
    dispatch(createToggleSearchAction());
  }

  function handleSearch(searchValue: string) {
    dispatch(createSearchAction(searchValue));
  }

  function handleSearchClear(data: unknown) {
    !data && dispatch(createSearchClearAction());
  }

  function handleValueEffect() {
    const data = getData(state);
    if (data && onSelect) {
      onSelect(data);
    }
  }

  function handleErrorEffect() {
    return onError && state.error && onError(state.error);
  }

  function handleSelectValue() {
    dispatch(createSelectAction(value && itemToLabel(value) || {}));
  }


}
