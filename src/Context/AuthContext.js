import React, {createContext, useContext, useReducer} from 'react'
import AuthReducer from './AuthReducer';

let initialState = {
  username: "",
  password: "",
  first_name: "",
  last_name: "",
  profileImage: "",
  address: {
    street_name: "",
    street_number: "",
    zip: "",
    city: "",
    state: ""
  }
};

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