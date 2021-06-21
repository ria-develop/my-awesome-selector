import {Column, Cursor, LookupValueType, Row} from '../data/lookup-data-types';
import {MouseEvent} from 'react';

export type SelectHandler<T> = (value: LookupValueType<T>) => void
export type ClearHandler = () => void
export type ErrorHandler = (e: Error) => void;
export type MouseEventHandler = (e: MouseEvent) => void;
export type SwitchHandler = (value: boolean) => void;
export type TextHandler = (value: string) => void;
export type UnknownDataHandler = (data?: unknown) => void;

export type ToggleSearchHandlers = {
  handleToggleSearch: () => void,
}
export type LookupHandlers = {
  handleChange: UnknownDataHandler,
  handleSearch: TextHandler,
  handleDropdownVisibleChange: SwitchHandler,
  handleKeyPress: TextHandler;
}
export type SelectionHandlers<T> = {
  handleCommitCursorMovement: () => void,
  handleCursorMoveTo: (cursor: Cursor) => void,
  handleSetDataSource: (rows: Row<T>[]) => void;
  handleSetColumns: (columns: Column<T>[]) => void; // TODO Remove
}
export type ErrorHandlers = {
  handleError: ErrorHandler
}

export type ActionHandlers<T> = ToggleSearchHandlers & LookupHandlers & SelectionHandlers<T> & ErrorHandlers
