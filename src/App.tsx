import React, {useCallback, useState} from 'react';
import 'antd/dist/antd.css';
import {ItemToLabel, LookupValueType} from './components/context/lookup-data-types';
import {Selection} from './components/context-aware-view/selectable-lookup-config';
import {ToggleSearchLookup} from './components/context-aware-view/toggle-search-lookup';

const itemToLabel: ItemToLabel<Selection> = ({category, categoryId}) => ({
  lookupValue: category,
  toggleSearchButtonLabel: categoryId
});

function App(): JSX.Element {
  const [value, handleSelect] = useState<LookupValueType<Selection> | undefined>({
    categoryId: '1',
    category: 'Category 1',
    type: 'category'
  });
  const [error, handleError] = useState<Error>();
  if (error) {
    console.error(error);
  }
  const handleClear = useCallback(() => handleSelect(undefined), []);
  return <ToggleSearchLookup
    value={value}
    onSelect={handleSelect}
    onClear={handleClear}
    onError={handleError}
    itemToLabel={itemToLabel}
  />;
}

export default App;
