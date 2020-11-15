import React, {createContext, useContext, useReducer} from 'react'
import AuthReducer from './AuthReducer';

let initialState = {};

export function useAuthState() {
  return useContext(AuthContext)[0];
}

export function useAuthReducer() {
  return useContext(AuthContext)[1];
}
export const AuthContext = createContext();

export function AuthStateProvider({ children }) {
  const value = useReducer(AuthReducer, initialState);
  return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}