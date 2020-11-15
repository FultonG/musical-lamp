import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, ButtonText } from '../../Components/Button';
import { useAppReducer } from '../../Context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  let dispatch = useAppReducer();
  const handleLogout =  async () => {
    await AsyncStorage.removeItem('User');
    dispatch({type: 'LOGOUT_USER'});
  }

  return(
    <Button onPress={handleLogout}><ButtonText>Log out</ButtonText></Button>
  )
}
const Authenticated = () => {
  let Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile}></Tab.Screen>
    </Tab.Navigator>
  )
};

export default Authenticated;