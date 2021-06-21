import React, {useEffect, useRef} from 'react';
import {AutoComplete} from 'antd';
import ToggleSearchButton from './toggle-search-button';
import {AutoCompleteProps} from 'antd/es/auto-complete';
import {useLookupContext} from './lookup-config';

function Lookup({dropdownRender}: { dropdownRender?: AutoCompleteProps['dropdownRender'] }): JSX.Element | null {
  const ref = useRef<AutoComplete>(null);
  const {
    handleSetColumns,
    searchValue,
    handleSetDataSource,
    lookupValue,
    placeholder,
    handleSearch,
    handleChange,
    handleDropdownVisibleChange
  } = useLookupContext();
  useEffect(() => {
    handleSetColumns([{
      Header: 'Client Name',
      accessor: 'data.clientName'
    },
    {
      Header: 'Client Id',
      accessor: 'data.clientId'
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
    <div>
      <ToggleSearchButton/>
      <AutoComplete
        size="small"
        ref={ref}
        open={true}
        value={searchValue || lookupValue}
        placeholder={placeholder}
        onSearch={handleSearch}
        onChange={handleChange}
        onDropdownVisibleChange={handleDropdownVisibleChange}
        dropdownRender={dropdownRender}
        dropdownMatchSelectWidth={false}
        dropdownStyle={{maxWidth: '700px', width: '100%', minHeight: '100px', height: '100%'}}
        showSearch={true}
        allowClear={true}
      />
    </div>
  );
}

export default Lookup;
