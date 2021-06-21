import {LookupContextProvider, Selection} from '../lookup/lookup-config';
import Lookup from '../lookup/lookup';
import React from 'react';
import {LookupContextApi} from '../lookup/context/lookup-context-setup';
import {AutoCompleteProps} from 'antd/es/auto-complete';

type DataSelectorProps<T> = LookupContextApi<T> & {
  dropdownRender: AutoCompleteProps['dropdownRender']
}

export function DataSelector({
  dropdownRender,
  value,
  onSelect,
  onClear,
  onError,
  itemToLabel
}: DataSelectorProps<Selection>): JSX.Element {
  return <LookupContextProvider
    value={value}
    onSelect={onSelect}
    onClear={onClear}
    onError={onError}
    itemToLabel={itemToLabel}
  >
    <Lookup dropdownRender={dropdownRender}/>
  </LookupContextProvider>;
}
