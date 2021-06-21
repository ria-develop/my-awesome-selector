import {Column as TableColumn, IdType as TableIdType} from 'react-table';

export type IdType<T> = TableIdType<T & Record<string, unknown>>
export type Column<T> = TableColumn<T & Record<string, unknown>>;

export type ValueType<T> = {
  type: IdType<T>
}
export type LookupValueType<T> = ValueType<T> & T

export type Row<T> = {
  data: T
}
export type Cursor = {
  type: string;
  rowIndex: number
}
export type ItemToLabelResult = { lookupValue?: string, toggleSearchButtonLabel?: string };
export type ItemToLabel<T> = (item: T) => ItemToLabelResult
