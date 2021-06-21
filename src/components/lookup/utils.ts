import {LookupValueType} from './data/lookup-data-types';
import {State} from './reducer/reducer';

export const inRange = (x: number, min: number, max: number): boolean => ((x - min) * (x - max) <= 0);

export function getData<T>({rows, cursor}: State<T>): LookupValueType<T> | undefined {
  if (!cursor || !inRange(cursor.rowIndex, 0,  rows.length - 1)) {
    return undefined;
  }
  const {type, rowIndex} = cursor;
  const {data} = rows[rowIndex];
  return {
    type,
    ...data
  };
}

export const scrollbarWidth = (): number => {
  // https://davidwalsh.name/detect-scrollbar-width
  const scrollDiv = document.createElement('div');
  scrollDiv.setAttribute('style', 'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;');
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

export default scrollbarWidth;
