/**
 * React Context to store login information globally
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// React
import React from 'react';
// Google Firebase
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';

// Type definition for props of LoginContextProvider
type LoginContextProviderProps = {
  children: React.ReactNode;
};

// Type for all actions
type Action =
  | { type: 'LOGIN'; email: string }
  | { type: 'LOGOUT' }
  | { type: 'INITIALIZE'; login: boolean; email?: string };

// Type definition for state
type State = {
  firebaseApp: FirebaseApp;
  firebaseAuth: Auth;
  login: boolean;
  email?: string;
  initialized: boolean;
  dispatch: React.Dispatch<Action>;
};

// Initial Data of Reducer
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyCexUUhZ3sLRmGFWJPBkErVYsutMbmvnR0',
  authDomain: 'wisconsin-badgers-ticket-final.firebaseapp.com',
  projectId: 'wisconsin-badgers-ticket-final',
  storageBucket: 'wisconsin-badgers-ticket-final.appspot.com',
  messagingSenderId: '312687998623',
  appId: '1:312687998623:web:6c79d87bedf0f223a6d4aa',
});
const initialData: State = {
  firebaseApp: firebaseApp,
  firebaseAuth: getAuth(firebaseApp),
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
      return {
        ...state,
        login: true,
        email: action.email,
      };
    case 'LOGOUT':
      return {
        ...state,
        login: false,
        email: undefined,
      };
    case 'INITIALIZE':
      // Initialize Firestore
      initializeFirestore(firebaseApp, { ignoreUndefinedProperties: true });

      return {
        ...state,
        login: action.login,
        email: action.email,
        initialized: true,
      };
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
