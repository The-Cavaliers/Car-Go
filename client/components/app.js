import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Profile from './ProfileScreen';
import Login from './LoginScreen';
import Drawer from './DrawerNav';


const App = StackNavigator({
  Login: { screen: Login },
  Profile: { screen: Profile },
  Drawer: { screen: Drawer },
});

export default App;

