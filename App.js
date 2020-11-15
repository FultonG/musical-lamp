import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import React from 'react';
import { AppStateProvider } from "./src/Context/AppContext";
import AppSwitcher from './src/Apps';

export default function App() {
  
  return (
    <NavigationContainer>
      <AppStateProvider>
          <AppSwitcher></AppSwitcher>
      </AppStateProvider>
    </NavigationContainer>
  );
}
