import {State} from '../reducer';
import React, {useCallback, useEffect} from 'react';
import {Action} from '../context/action-types';
import {ActionHandlers} from '../context/lookup-context-handlers-types';
import {
  createCommitCursorMovementAction,
  createDataSetColumnsAction,
  createDataSetRowsAction,
  createDropdownVisibilityChangeAction,
  createErrorAction,
  createKeyPressAction,
  createMoveCursorToAction,
  createSearchAction,
  createSearchClearAction,
  createSelectAction,
  createToggleSearchAction
} from '../context/actions';
import {getData} from '../utils';
import {Column, Cursor, Row} from '../context/lookup-data-types';
import {LookupContextApi} from '../context/lookup-context-setup';

type UseHandlersResult<T> = ActionHandlers<T>

export function useHandlers<T>(
  {value, onClear, onSelect, onError, itemToLabel}: LookupContextApi<T>,
  state: State<T>,
  dispatch: React.Dispatch<Action<T>>): UseHandlersResult<T> {

  useEffect(handleSelectValue, [dispatch, itemToLabel, value]);
  useEffect(handleErrorEffect, [state.error, onError]);
  useEffect(handleValueEffect, [onSelect, state]);
  useEffect(handleClearEffect, [onClear, state.clear]);

  return {
    handleChange: useCallback(handleSearchClear, [dispatch]),
    handleSearch: useCallback(handleSearch, [dispatch]),
    handleToggleSearch: useCallback(handleToggleSearch, [dispatch]),
    handleDropdownVisibleChange: useCallback(handleDropdownVisibleChange, [dispatch]),
    handleCursorMoveTo: useCallback(handleCursorMoveTo, [dispatch]),
    handleCommitCursorMovement: useCallback(handleCommitCursorMovement, [dispatch]),
    handleKeyPress: useCallback(handleKeyPress, [dispatch]),
    onError: useCallback(handleError, [dispatch]),
    handleSetDataSource: useCallback(handleSetDataSource, [dispatch]),
    handleSetColumns: useCallback(handleSetColumns, [dispatch])
  };

  function handleClearEffect() {
    state.clear && onClear && onClear();
  }

  function handleValueEffect() {
    const data = getData(state);
    data && onSelect && onSelect(data);
  }

  function handleErrorEffect() {
    return onError && state.error && onError(state.error);
  }

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

  function handleCursorMoveTo(cursor: Cursor) {
    dispatch(createMoveCursorToAction(cursor));
  }

  function handleCommitCursorMovement() {
    dispatch(createCommitCursorMovementAction());
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

  function handleSelectValue() {
    dispatch(createSelectAction(value && itemToLabel(value) || {}));
  }
}
