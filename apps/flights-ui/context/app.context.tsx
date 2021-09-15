import PropTypes from 'prop-types';
import React, { createContext, useContext, useReducer } from 'react';

import { IFlight } from '@emirates/common/model';

const StateContext = createContext(undefined);
const DispatchContext = createContext(undefined);

interface State {
  selectedFlight: IFlight;
  flights: IFlight[];
}

const initialState: State = {
  selectedFlight: null,
  flights: null,
};

const reducer = (state: State, action: any) => {
  const act = action;

  if (!act) {
    throw new Error(`Unhandled action type: ${action}`);
  }

  const update = act(state);
  return { ...state, ...update };
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node,
};

function useAppState() {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppProvider');
  }
  return context;
}
function useAppDispatch() {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a AppProvider');
  }
  return context;
}

export {
  AppProvider,
  // State
  useAppState,
  // Dispatch
  useAppDispatch,
  // Actions
};

export default AppProvider
