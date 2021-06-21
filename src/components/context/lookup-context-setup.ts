import {useContext} from 'react';
import {ItemToLabel, LookupValueType} from './lookup-data-types';
import {ClearHandler, ErrorHandler, SelectHandler} from './lookup-context-handlers-types';
import {createLookupContext, createLookupContextProvider} from './lookup-context';
import {LookupContextProvider, LookupContextType, ReactLookupContext} from './lookup-context-types';

export type LookupContextApi<T> = {
  value?: LookupValueType<T>,
  onSelect: SelectHandler<T>;
  onClear: ClearHandler;
  onError: ErrorHandler;
  itemToLabel: ItemToLabel<LookupValueType<T>>;
}

export type SetupLookupContextResult<T> = {
  LookupContext: ReactLookupContext<T>,
  LookupContextProvider: LookupContextProvider<T>,
  useLookupContext: () => LookupContextType<T>;
}

export function setupLookupContext<T>(initial: LookupContextType<T>): SetupLookupContextResult<T> {
  const LookupContext = createLookupContext<T>(initial);

  function useLookupContext() {
    return useContext(LookupContext);
  }

  const LookupContextProvider = createLookupContextProvider<T>(LookupContext);
  return {
    LookupContext,
    LookupContextProvider,
    useLookupContext
  };
}
