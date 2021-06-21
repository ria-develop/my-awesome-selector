import {LookupContextProvider, Selection} from '../context/lookup-config';
import {LookupProps} from './search-lookup';
import React, {PropsWithChildren} from 'react';
import {LookupContextApi} from '../context/lookup-context-setup';

type DataSelectorProps<T> = LookupContextApi<T> &  Omit<LookupProps, 'onSelect'>

export function DataSelector({
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
