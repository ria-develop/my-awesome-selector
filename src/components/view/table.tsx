/* eslint-disable react/jsx-key */
import React from 'react';
import scrollbarWidth from '../context/utils';
import {useTable, useBlockLayout} from 'react-table';
import {FixedSizeList} from 'react-window';
import './table.css';
import {Column} from '../context/lookup-data-types';
const ROW_HEIGHT =  35;
function Table<T>({columns, data}: { columns: Column<T>[], data: any[] }): JSX.Element {
  const defaultColumn = React.useMemo(
    () => ({
      width: 150
    }),
    []
  );
  const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useBlockLayout
  );

  const RenderRow = React.useCallback(
    ({index, style}) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style
          })}
          className="tr"
        >
          {row.cells.map(cell => {
            return (
              <div {...cell.getCellProps()} className="td">
                {cell.render('Cell')}
              </div>
            );
          })}
        </div>
      );
    },
    [prepareRow, rows]
  );

  return (
    <div {...getTableProps()} className="table">
      <div>
        {headerGroups.map(headerGroup => (
          <div {...headerGroup.getHeaderGroupProps()} className="tr">
            {headerGroup.headers.map(column => (
              <div {...column.getHeaderProps()} className="th">
                {column.render('Header')}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div {...getTableBodyProps()}>
        <FixedSizeList
          height={ROW_HEIGHT * rows.length}
          itemCount={rows.length}
          itemSize={ROW_HEIGHT}
          width={totalColumnsWidth + scrollBarSize}
        >
          {RenderRow}
        </FixedSizeList>
      </div>
    </div>
  );
}

export default Table;
