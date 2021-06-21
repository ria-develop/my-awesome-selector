import React, {useCallback, useState} from 'react';
import 'antd/dist/antd.css';
import {ItemToLabel, LookupValueType} from './components/lookup/data/lookup-data-types';
import {Selection} from './components/lookup/lookup-config';
import DropdownTableRender from './components/lookup/renderer/dropdown-table-render';
import {DataSelector} from './components/selector/DataSelector';

const itemToLabel: ItemToLabel<Selection> = ({clientName, clientId}) => ({label: clientName, value: [clientId, 'xyz']});

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
  const dropdownRender = useCallback(() => <DropdownTableRender/>, []);
  const handleClear = useCallback(() => handleSelect(undefined), []);
  return <DataSelector
    value={value}
    onSelect={handleSelect}
    onClear={handleClear}
    onError={handleError}
    dropdownRender={dropdownRender}
    itemToLabel={itemToLabel}/>;
}

export default App;
