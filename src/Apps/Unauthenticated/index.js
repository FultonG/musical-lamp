import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './Screens/Register';
import RegisterForm from './Screens/RegisterForm';
import RegisterProfileDetails from './Screens/RegisterProfileDetails';
import Login from './Screens/Login';
const Unauthenticated = () => {
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Register" component={Register}></AuthStack.Screen>
      <AuthStack.Screen name="RegisterForm" component={RegisterForm}></AuthStack.Screen>
      <AuthStack.Screen name="RegisterProfileDetails" component={RegisterProfileDetails}></AuthStack.Screen>
      <AuthStack.Screen name="Login" component={Login}></AuthStack.Screen>
    </AuthStack.Navigator>
  )
};

export default Unauthenticated;