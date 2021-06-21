import {Column, Cursor, Row} from '../data/lookup-data-types';
import {SelectValue} from 'antd/es/select';

export enum ActionType {
  'SELECT',
  'MOVE_CURSOR_TO',
  'COMMIT_CURSOR_MOVEMENT',
  'SEARCH',
  'SEARCH_TOGGLE',
  'SEARCH_CLEAR',
  'DROPDOWN_VISIBILITY_CHANGE',
  'KEY_PRESS',
  'ERROR',
  'DATA_SET_COLUMNS',
  'DATA_SET_ROWS',
}

export type SearchAction = {
  type: ActionType.SEARCH;
  searchValue?: string
}
export type KeyPressAction = {
  type: ActionType.KEY_PRESS;
  key: string
}
export type SearchToggleAction = {
  type: ActionType.SEARCH_TOGGLE;
}
export type MoveCursorToAction = {
  type: ActionType.MOVE_CURSOR_TO;
  moveTo: Cursor;
};
export type SelectAction = {
  type: ActionType.SELECT;
  lookupValue?: SelectValue,
  toggleSearchButtonLabel?: string
};
export type CommitCursorMovementAction = {
  type: ActionType.COMMIT_CURSOR_MOVEMENT;
};
export type SearchClearAction = {
  type: ActionType.SEARCH_CLEAR;
};
export type DropdownVisibilityChangeAction = {
  type: ActionType.DROPDOWN_VISIBILITY_CHANGE;
  open: boolean
};
export type ErrorAction = {
  type: ActionType.ERROR
  error: Error
}
export type DataSetColumnsAction<T> = {
  type: ActionType.DATA_SET_COLUMNS,
  columns: Column<T>[]
}
export type DataSetRowsAction<T> = {
  type: ActionType.DATA_SET_ROWS,
  rows: Row<T>[]
}
export type Action<T> =
  | CommitCursorMovementAction
  | SearchAction
  | SearchToggleAction
  | MoveCursorToAction
  | SelectAction
  | SearchClearAction
  | DropdownVisibilityChangeAction
  | KeyPressAction
  | ErrorAction
  | DataSetColumnsAction<T>
  | DataSetRowsAction<T>
