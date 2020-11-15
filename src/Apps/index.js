import React, { useEffect } from 'react';
import { useAppReducer, useAppState } from '../Context/AppContext';
import { AuthStateProvider } from "../../src/Context/AuthContext";
import Unauthenticated from './Unauthenticated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Authenticated from './Authenticated';

const AppSwitcher = () => {
  let state = useAppState();
  let dispatch = useAppReducer();
  useEffect(() => {
    (async () => {
      try {
        let user = await AsyncStorage.getItem('User');
        if(user !== null){
          dispatch({ type: 'UPDATE_USER', payload: { user: JSON.parse(user), auth: true } })
        }
      } catch (e) {
        console.log(e);
      }

    })();
  },[])
  return (
    <>
      {state.auth ? <Authenticated/> : <AuthStateProvider><Unauthenticated /></AuthStateProvider>}
    </>
  )
};

export default AppSwitcher;