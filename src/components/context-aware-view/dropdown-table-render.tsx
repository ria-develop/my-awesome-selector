import React, {MouseEvent, useCallback} from 'react';
import {useLookupContext} from '../context/lookup-config';
import Table from '../view/table';
import './dropdown-table-render.css';
import {getColIndexFromAriaColIndexAttribute, getRowIndexFromAriaRowIndexAttribute} from '../view/utils';

function DropdownTableRender(): JSX.Element {
  const {rows, columns, handleCommitCursorMovement, handleCursorMoveTo} = useLookupContext();
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const rowIndex = getRowIndexFromAriaRowIndexAttribute(e);
    const colIndex = getColIndexFromAriaColIndexAttribute(e);
    handleCursorMoveTo({type: `${colIndex}`, rowIndex});
  }, [handleCursorMoveTo]);
  const handleMouseDown = useCallback((e: MouseEvent) => e.preventDefault(), []);
  const handleMouseClick = useCallback(() => handleCommitCursorMovement(), [handleCommitCursorMovement]);

  return <div onMouseDown={handleMouseDown} onMouseOver={handleMouseOver} onClick={handleMouseClick}>
    <Table columns={columns}
      data={rows}/>
  </div>;
}

export default DropdownTableRender;
