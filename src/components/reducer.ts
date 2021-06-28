import {Column, Cursor, Row} from './context/lookup-data-types';
import {Action, ActionType} from './context/action-types';
import {SelectValue} from 'antd/es/select';
//import logging from './utils/logging';

//const debugLog = logging('reducer', 'debug');

export type ToggleSearchState = {
  toggleSearchVisible: boolean;
  toggleSearchButtonLabel?: string;
}
export type LookupState = {
  clear: boolean;
  open: boolean;
  searchValue?: string;
  lookupValue?: SelectValue;
}

export type DropdownState<T> = {
  cursor?: Cursor;
  selectionCursor?: Cursor;
  rows: Row<T>[];
  columns: Column<T>[];
}

export type ErrorState = {
  error?: Error,
}

export type State<T> = ToggleSearchState & LookupState & DropdownState<T> & ErrorState;

export const getInitialState = <T>(): State<T> => ({
  clear: false,
  open: false,
  toggleSearchVisible: false,
  columns: [],
  rows: []
});

export function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  const newState = {...state, clear: false};
  switch (action.type) {
    case ActionType.SEARCH_TOGGLE:
      return {...newState, toggleSearchVisible: !state.toggleSearchVisible};
    case ActionType.SEARCH:
      return {...newState, open: !!action.searchValue, searchValue: action.searchValue};
    case ActionType.MOVE_CURSOR_TO:
      return {...newState, cursor: action.moveTo};
    case ActionType.COMMIT_CURSOR_MOVEMENT:
      return {...newState, selectionCursor: state.cursor};
    case ActionType.SELECT:
      return {
        ...newState,
        lookupValue: action.lookupValue,
        toggleSearchButtonLabel: action.toggleSearchButtonLabel,
        toggleSearchVisible: !!action.lookupValue,
        searchValue: undefined
      };
    case ActionType.SEARCH_CLEAR:
      return {...getInitialState(), clear: true};
    case ActionType.DROPDOWN_VISIBILITY_CHANGE:
      return {...newState, open: action.open};
    case ActionType.DATA_SET_COLUMNS:
      return {...newState, columns: action.columns};
    case ActionType.DATA_SET_ROWS:
      return {...newState, rows: action.rows};
    default:
      return newState;
  }
}
