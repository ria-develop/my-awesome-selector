import React, {createContext, PropsWithChildren, Reducer, useReducer} from 'react';
import {getInitialState, reducer, State} from '../reducer/reducer';
import {Action} from '../reducer/action-types';
import {useHandlers} from './hooks/use-handlers';
import {LookupContextApi} from './lookup-context-setup';
import {LookupContextProvider, LookupContextType, ReactLookupContext} from './lookup-context-types';

export function createLookupContext<T>(initial: LookupContextType<T>): ReactLookupContext<T> {
  return createContext<LookupContextType<T>>(initial);
}

export function createLookupContextProvider<T>(LookupContext: React.Context<LookupContextType<T>>): LookupContextProvider<T> {
  function LookupContextProvider({children, ...api}: PropsWithChildren<LookupContextApi<T>>): JSX.Element {
    const [state, dispatch] = useReducer<Reducer<State<T>, Action<T>>>(reducer, getInitialState());
    const [store, storedDispatch] = React.useMemo(() => [state, dispatch], [state]);
    return <LookupContext.Provider value={{...store, ...useHandlers(api, state, storedDispatch)}}>{children}</LookupContext.Provider>;
  }
  return LookupContextProvider;
}
