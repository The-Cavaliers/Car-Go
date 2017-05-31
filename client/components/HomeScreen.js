import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import DrawerButton from './DrawerButton';

export default class Home extends Component {

  static navigationOptions = {
    title: 'Home Screen',

    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/car.jpg')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <View>
       <TouchableOpacity onPress={() => this.props.navigation.navigate('DrawerOpen')}>
        <Text>Home Screen </Text>
       </TouchableOpacity>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  container: {
    flex: 1,
    padding: 50,
    color: 'gray',
  },
});
