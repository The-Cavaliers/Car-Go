import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import { StackNavigator } from 'react-navigation';
import Login from './loginScreen';
import Profile from './profileScreen';

export const App = StackNavigator({
    Login: { screen: Login },
    Profile: { screen: Profile }
});
