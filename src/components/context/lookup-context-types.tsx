import {DropdownState, ErrorState, LookupState, ToggleSearchState} from './reducer';
import {SelectionHandlers, ErrorHandlers, LookupHandlers, ToggleSearchHandlers} from './lookup-context-handlers-types';
import React, {Context} from 'react';
import {LookupContextApi} from './lookup-context-setup';

export type ToggleSearchContext = ToggleSearchState & ToggleSearchHandlers;
export type LookupViewContext = LookupState & LookupHandlers;
export type DropdownContext<T> = DropdownState<T> & SelectionHandlers<T>;
export type ErrorContext = ErrorState & ErrorHandlers;
export type LookupContextType<T> = DropdownContext<T> & LookupViewContext & ToggleSearchContext & ErrorContext;
export type LookupContextProvider<T> = (props: React.PropsWithChildren<LookupContextApi<T>>) => JSX.Element;
export type ReactLookupContext<T> = Context<LookupContextType<T>>;
