import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Profile } from './ProfileScreen';
import Login from './LoginScreen';
import Drawer from './DrawerNav';
import { UserProfile } from './UserProfile';


const App = StackNavigator({
  Login: { screen: Login },
  Profile: { screen: Profile },
  Drawer: { screen: Drawer },
  UserProfile: { screen: UserProfile },
});

export default App;

