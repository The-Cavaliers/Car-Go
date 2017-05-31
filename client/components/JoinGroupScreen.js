import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';


export default class JoinGroup extends Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('DrawerOpen')}>
        <Text> Find a Ride </Text>
      </TouchableOpacity>
    )
  }
}
