import React, {useEffect, useRef} from 'react';
import {AutoComplete} from 'antd';
import {AutoCompleteProps} from 'antd/es/auto-complete';
import {useLookupContext} from './selectable-lookup-config';

export type LookupProps = Omit<AutoCompleteProps, 'size' |
  'open' |
  'value' |
  'onSearch' |
  'onChange' |
  'onDropdownVisibleChange' |
  'dropdownMatchSelectWidth' |
  'showSearch' |
  'allowClear'  >

function SearchLookup({ ...props}: LookupProps): JSX.Element | null {
  const ref = useRef<AutoComplete>(null);
  const {
    handleSetColumns,
    searchValue,
    handleSetDataSource,
    lookupValue,
    handleSearch,
    handleChange,
    handleDropdownVisibleChange
  } = useLookupContext();
  useEffect(() => {
    handleSetColumns([{
      Header: 'Client Name',
      accessor: 'data.category'
    },
    {
      Header: 'Client Id',
      accessor: 'data.categoryId'
    }
    ]);
    handleSetDataSource([{
      data: {
        clientName: 'John Doe',
        clientId: '1234'
      }
    }
    ]);
  }, [handleSetColumns, handleSetDataSource]);

  return (
    <AutoComplete
      {...props}
      ref={ref}
      size="small"
      open={true}
      value={searchValue || lookupValue}
      onSearch={handleSearch}
      onChange={handleChange}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      dropdownMatchSelectWidth={false}
      showSearch={true}
      allowClear={true}
    />
  );
}

export default SearchLookup;
