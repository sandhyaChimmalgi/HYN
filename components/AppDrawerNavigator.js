
import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import NotificationScreen from '../screens/NotificationScreen'

import CustomSidebarMenu  from './CustomSidebarMenu';
import SettingScreen from '../screens/SettingScreen'
import { Icon } from 'react-native-elements';
import HomeScreen from '../screens/HomeScreen';
import RequestForHelp from '../screens/RequestForHelpScreen'

import VolenteerScreen from '../screens/VolenteerScreen';

export const AppDrawerNavigator = createDrawerNavigator({
   Home:{
    screen:HomeScreen
   },
   Help:{
    screen:RequestForHelp
   },
   Volenteer:{
    screen:VolenteerScreen
   },
   Setting : {
    screen : SettingScreen ,
    },
    
    Notifications:{
      screen:NotificationScreen,
    },

  },
  {
    contentComponent:CustomSidebarMenu
  },
  {
    initialRouteName : 'Home'
  })