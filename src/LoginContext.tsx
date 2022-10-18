/**
 * React Context to store login information globally
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';

// Type definition for props of LoginContextProvider
type LoginContextProviderProps = {
  children: React.ReactNode;
};

// Type for all actions
// Token will be saved in the cookie
type Action =
  | { type: 'LOGIN' }
  | { type: 'LOGOUT' }
  | { type: 'INITIALIZE'; login: boolean };

// Type definition for state
type State = {
  login: boolean;
  // Will be true after checking current cookie's eligibility
  initialized: boolean;
  dispatch: React.Dispatch<Action>;
};

// Initial Data of Reducer
const initialData: State = {
  login: false,
  initialized: false,
  dispatch: () => {},
};

/**
 * Reducer to modify the login context's state
 *
 * @param {State} state Current State
 * @param {Action} action Action to modify the state
 * @return {State} New State
 */
function reducer(state: State, action: Action): State {
  // Actiaul login data - token - will be set in cookie automatically
  switch (action.type) {
    case 'LOGIN':
      return { ...state, login: true };
    case 'LOGOUT':
      return { ...state, login: false };
    case 'INITIALIZE':
      return { ...state, login: action.login, initialized: true };
    default:
      return state;
  }
}

// Context for user login
const LoginContext = React.createContext<State>(initialData);

/**
 * React Functional Component for LoginContext
 *
 * @param {LoginContextProviderProps} props Properties that passed from
 *   the parent component.
 * @return {React.ReactElement} Renders LoginContextProvider
 */
export function LoginContextProvider(
  props: LoginContextProviderProps
): React.ReactElement {
  // State
  const [state, dispatch] = React.useReducer(reducer, initialData);

  // Context Value
  const value = { ...state, dispatch };

  // Render
  return (
    <LoginContext.Provider value={value}>
      {props.children}
    </LoginContext.Provider>
  );
}

/**
 * React Cusotm Hooks to use the Login Context
 *
 * @return {State} current global state (Login Context)
 */
export function useLoginContext(): State {
  const state = React.useContext(LoginContext);
  if (!state) throw new Error('Cannot Find LoginContext');
  return state;
}
