import React from 'react';
import {Button} from 'antd';
import {useLookupContext} from '../context/lookup-config';
import {ToggleSearchContext} from '../context/lookup-context-types';

function ToggleSearchButton({toggleSearchVisible, handleToggleSearch, toggleSearchButtonLabel}: ToggleSearchContext) {
  console.log('ToggleSearchButton', {toggleSearchVisible, handleToggleSearch, toggleSearchButtonLabel});
  return toggleSearchVisible && <Button size="small"
    onClick={handleToggleSearch}>{toggleSearchButtonLabel}</Button> || null;
}

const MemoizedToggleSearchButton = React.memo(ToggleSearchButton);

function ContextAwareToggleSearchButton(): JSX.Element  {
  const context = useLookupContext();
  const {toggleSearchButtonLabel, toggleSearchVisible, handleToggleSearch} = context;
  return <MemoizedToggleSearchButton
    toggleSearchVisible={toggleSearchVisible}
    toggleSearchButtonLabel={toggleSearchButtonLabel}
    handleToggleSearch={handleToggleSearch}/>;
}

export default ContextAwareToggleSearchButton;
