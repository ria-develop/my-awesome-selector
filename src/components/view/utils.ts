import React, {HTMLAttributes} from 'react';
export const defaultIfNaN = (n: number, defaultValue: number): number => Number.isNaN(n) ? defaultValue:n;

export const getFromElement = (target: Element, attr: keyof HTMLAttributes<Element>): number =>
  parseInt(target.closest(`[${attr}]`)?.getAttribute(attr) + '', 10);

export const getOrDefault = (target: Element, attr: keyof HTMLAttributes<Element>, defaultValue: number): number =>
  defaultIfNaN(getFromElement(target, attr), defaultValue);

export const getRowIndexFromAriaRowIndexAttribute = (e: React.MouseEvent): number =>  getOrDefault(e.target as Element, 'aria-rowindex', -1);
export const getColIndexFromAriaColIndexAttribute = (e: React.MouseEvent): number =>  getOrDefault(e.target as Element, 'aria-colindex', -2);

