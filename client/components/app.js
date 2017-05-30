import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';
import Profile from './ProfileScreen';
import Login from './LoginScreen';

const App = StackNavigator({
  Login: { screen: Login },
  Profile: { screen: Profile },
});

export default App;
