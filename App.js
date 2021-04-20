import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen'
import HomeScreen from './screens/HomeScreen';
import RequestForHelp from './screens/RequestForHelpScreen'
import {createSwitchNavigator,createAppContainer} from 'react-navigation';

import VolenteerScreen from './screens/VolenteerScreen';
import {AppDrawerNavigator} from './components/AppDrawerNavigator'
console.disableYellowBox = true;
export default function App() {
  return (
    
    <AppContainer/>
    
  );
}


const switchNavigator = createSwitchNavigator({
  Welcome:{screen:WelcomeScreen}, 
  Drawer:{screen:AppDrawerNavigator}
})
const AppContainer =  createAppContainer(switchNavigator)
