import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import React from 'react';
import Register from './src/Screens/Register';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterForm from './src/Screens/RegisterForm';
import { AuthStateProvider } from "./src/Context/AuthContext";
import RegisterProfileDetails from './src/Screens/RegisterProfileDetails';

export default function App() {
  const AuthStack = createStackNavigator();
  return (
    <NavigationContainer>
      <AuthStateProvider>
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="Register" component={Register}></AuthStack.Screen>
          <AuthStack.Screen name="RegisterForm" component={RegisterForm}></AuthStack.Screen>
          <AuthStack.Screen name="RegisterProfileDetails" component={RegisterProfileDetails}></AuthStack.Screen>
        </AuthStack.Navigator>
      </AuthStateProvider>
    </NavigationContainer>
  );
}
