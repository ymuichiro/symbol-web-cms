import React, { useReducer } from 'react';
import { LangsCode } from '../model/SystemModel';
import { ContextAction, ContextState, ContextStore } from './type';

const initialState: ContextState = {
  lang: 'en',
};

export const SystemContext = React.createContext<ContextStore>({
  contextState: initialState,
  updateContext: () => {},
});

// TODO: https://itnext.io/react-hooks-with-context-as-a-state-management-solution-526d1c13a07d
const contextReducer = (state: ContextState, action: ContextAction) => {
  switch (action.type) {
    case 'update':
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
};

export const ContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [contextState, updateContext] = useReducer(contextReducer, initialState);
  return <SystemContext.Provider value={{ contextState, updateContext }}>{props.children}</SystemContext.Provider>;
};
