import {Column, Cursor, Row} from '../data/lookup-data-types';
import {Action, ActionType} from './action-types';
import {SelectValue} from 'antd/es/select';

export type ToggleSearchState = {
  toggleSearchVisible: boolean;
  toggleSearchButtonLabel?: string;
}
export type LookupState = {
  open: boolean;
  searchValue?: string;
  lookupValue?: SelectValue;
  placeholder: string;
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

export const getInitialState = <T>():State<T> => ({
  open: false,
  toggleSearchVisible: false,
  placeholder: 'Type something',
  columns: [],
  rows: []
});

export function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  console.debug('Reducer', {state, action});
  switch (action.type) {
    case ActionType.SEARCH_TOGGLE:
      return {...state, toggleSearchVisible: !state.toggleSearchVisible};
    case ActionType.SEARCH:
      return {...state, open: !!action.searchValue, searchValue: action.searchValue};
    case ActionType.MOVE_CURSOR_TO:
      return {...state, cursor: action.moveTo};
    case ActionType.COMMIT_CURSOR_MOVEMENT:
      return {...state, selectionCursor: state.cursor};
    case ActionType.SELECT:
      return {
        ...state,
        lookupValue: action.lookupValue,
        toggleSearchButtonLabel: action.toggleSearchButtonLabel,
        toggleSearchVisible: !!action.lookupValue,
        searchValue: undefined
      };
    case ActionType.SEARCH_CLEAR:
      return {...getInitialState()};
    case ActionType.DROPDOWN_VISIBILITY_CHANGE:
      return {...state, open: action.open};
    case ActionType.DATA_SET_COLUMNS:
      return {...state, columns: action.columns};
    case ActionType.DATA_SET_ROWS:
      return {...state, rows: action.rows};
    default:
      return state;
  }
}
