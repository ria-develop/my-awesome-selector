import {LookupContextProvider, Selection} from './selectable-lookup-config';
import {LookupProps} from './search-lookup';
import React, {PropsWithChildren} from 'react';
import {LookupContextApi} from '../context/lookup-context-setup';

export type DataSelectorProps<T> = LookupContextApi<T> &  Omit<LookupProps, 'onSelect'>

export function SelectableLookupContextProvider({
  value,
  onSelect,
  onClear,
  onError,
  itemToLabel,
  children
}: PropsWithChildren<DataSelectorProps<Selection>>): JSX.Element {
  return <LookupContextProvider
    value={value}
    onSelect={onSelect}
    onClear={onClear}
    onError={onError}
    itemToLabel={itemToLabel}
  >
    {children}
  </LookupContextProvider>;
}
