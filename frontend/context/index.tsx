import React, { useReducer } from 'react';
import { ContextAction, ContextState, ContextStore } from './type';

const initialState: ContextState = {};

export const SystemContext = React.createContext<ContextStore>({
  contextState: initialState,
  updateContext: () => {},
});

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
