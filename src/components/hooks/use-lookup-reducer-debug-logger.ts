import React, {useCallback} from 'react';
import {State} from '../reducer';
import {Action, ActionType} from '../context/action-types';

const useLookupReducerDebugLogger = <T>(reducer: React.Reducer<State<T>, Action<T>>): React.Reducer<State<T>, Action<T>> => {
  return useCallback((state: State<T>, action: Action<T>) => {
    const next = reducer(state, action);
    const {type, ...payload} = action;
    console.groupCollapsed(`%cAction: %c${ActionType[type]}`, 'color: lightgreen; font-weight: bold;', 'color: blue; font-weight: bold;');
    console.debug('%cPayload:', 'color: #00A7F7; font-weight: 700;', payload);
    console.debug('%cPrevious/Next State:', 'color: #9E9E9E; font-weight: 700;', state, next);
    console.groupEnd();
    return next;
  }, [reducer]);
};

export default useLookupReducerDebugLogger;
