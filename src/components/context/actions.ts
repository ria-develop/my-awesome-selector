import {Column, Cursor, ItemToLabelResult, Row} from './lookup-data-types';
import {
  ActionType,
  CommitCursorMovementAction,
  DataSetColumnsAction,
  DataSetRowsAction,
  DropdownVisibilityChangeAction,
  ErrorAction,
  KeyPressAction,
  MoveCursorToAction,
  SearchAction, SearchClearAction,
  SearchToggleAction,
  SelectAction
} from './action-types';

export const createSelectAction = ({lookupValue, toggleSearchButtonLabel}: ItemToLabelResult): SelectAction => ({
  type: ActionType.SELECT,
  lookupValue,
  toggleSearchButtonLabel
});

export const createMoveCursorToAction = (moveTo: Cursor): MoveCursorToAction => ({
  type: ActionType.MOVE_CURSOR_TO,
  moveTo
});
export const createCommitCursorMovementAction = (): CommitCursorMovementAction => ({
  type: ActionType.COMMIT_CURSOR_MOVEMENT
});
export const createToggleSearchAction = (): SearchToggleAction => ({
  type: ActionType.SEARCH_TOGGLE
});
export const createSearchAction = (searchValue: string): SearchAction => ({
  type: ActionType.SEARCH,
  searchValue
});
export const createSearchClearAction = (): SearchClearAction => ({
  type: ActionType.SEARCH_CLEAR,
});
export const createKeyPressAction = (key: string): KeyPressAction => ({
  type: ActionType.KEY_PRESS,
  key
});
export const createDropdownVisibilityChangeAction = (open: boolean): DropdownVisibilityChangeAction => ({
  type: ActionType.DROPDOWN_VISIBILITY_CHANGE,
  open
});
export const createErrorAction = (error: Error): ErrorAction => ({
  type: ActionType.ERROR,
  error
});
export const createDataSetColumnsAction = <T>(columns: Column<T>[]): DataSetColumnsAction<T> => ({
  type: ActionType.DATA_SET_COLUMNS,
  columns
});
export const createDataSetRowsAction = <T>(rows: Row<T>[]): DataSetRowsAction<T> => ({
  type: ActionType.DATA_SET_ROWS,
  rows
});
