import appReducer, {
  initialState as defaultState,
} from '../reducers/appReducer';
import { createContext, useContext, useReducer } from 'react';

const StateContext = createContext(null);
const DispatchContext = createContext(null);

export function useAppState() {
  return useContext(StateContext);
}

export function useAppDispatch() {
  return useContext(DispatchContext);
}

// Able to pass in an initialState for testing purposes, e.g. init to different values.
export default function AppContext({ initialState = defaultState, children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
