import React, {useCallback, useState} from 'react';
import 'antd/dist/antd.css';
import {ItemToLabel, LookupValueType} from './components/context/lookup-data-types';
import {Selection} from './components/context/lookup-config';
import DropdownTableRender from './components/context-aware-view/dropdown-table-render';
import {DataSelector} from './components/context-aware-view/data-selector';
import SearchLookup from './components/context-aware-view/search-lookup';
import ToggleSearchButton from './components/context-aware-view/toggle-search-button';

const itemToLabel: ItemToLabel<Selection> = ({clientName, clientId}) => ({
  lookupValue: clientName,
  toggleSearchButtonLabel: clientId
});

function App(): JSX.Element {
  const [value, handleSelect] = useState<LookupValueType<Selection> | undefined>({
    clientId: '123',
    clientName: 'John Doe',
    type: 'clientName'
  });
  const [error, handleError] = useState<Error>();
  if (error) {
    console.error(error);
  }
  const handleClear = useCallback(() => handleSelect(undefined), []);
  return <DataSelector
    value={value}
    onSelect={handleSelect}
    onClear={handleClear}
    onError={handleError}
    itemToLabel={itemToLabel}>
    <ToggleSearchButton/>
    <SearchLookup dropdownRender={() => <DropdownTableRender/> }
      dropdownStyle={{maxWidth: '700px', width: '100%', minHeight: '100px', height: '100%'}}
      placeholder="Type smth"/>
  </DataSelector>;
}

export default App;
