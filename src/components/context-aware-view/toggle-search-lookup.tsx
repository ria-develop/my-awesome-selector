import React, {PropsWithChildren} from 'react';
import {SelectableLookupContextProvider, DataSelectorProps} from './selectable-lookup-context-provider';
import {Selection} from './selectable-lookup-config';
import ToggleSearchButton from './toggle-search-button';
import SearchLookup from './search-lookup';
import DropdownTableRender from './dropdown-table-render';

export function ToggleSearchLookup({
  value,
  onSelect,
  onClear,
  onError,
  itemToLabel
}: PropsWithChildren<DataSelectorProps<Selection>>): JSX.Element {
  return <SelectableLookupContextProvider
    value={value}
    onSelect={onSelect}
    onClear={onClear}
    onError={onError}
    itemToLabel={itemToLabel}>
    <ToggleSearchButton/>
    <SearchLookup dropdownRender={() => <DropdownTableRender/>}
      dropdownStyle={{maxWidth: '700px', width: '100%', minHeight: '100px', height: '100%'}}
      placeholder="Type something"/>
  </SelectableLookupContextProvider>;
}
