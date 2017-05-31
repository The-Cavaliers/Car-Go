import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export default class CreateGroup extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('DrawerOpen')}>
          <Text>in create group</Text>
        </TouchableOpacity>
      </View>
    )
  }
};


