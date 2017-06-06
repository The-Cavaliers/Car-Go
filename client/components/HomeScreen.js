import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  View,
  Button,
  Animated,
} from 'react-native';

import { connect } from 'react-redux'; // inject data where we need

import DrawerButton from './DrawerButton';
// import Geocoder from 'react-native-geocoding';
// Geocoder.setApiKey('AIzaSyDpzJnZVR260R_2L2k5x91UY2g-YIcBWg8'); 
import Map from './Map';


const mapStateToProps = (state) => {
  return {
    state,
  }
}

class Home extends Component {

  static navigationOptions= ({navigation}) => ({
    title: 'Home Screen',
    headerLeft: <DrawerButton navigation={navigation} />,
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/menu.jpg')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  });

  render() {
    // Geocoder.getFromLocation("Colosseum").then(
    //   json => {
    //     var location = json.results[0].geometry.location;
    //     alert(location.lat + ", " + location.lng);
    //   },
    //   error => {
    //     alert(error);
    //   }
    // );
    return (  
      <Map />
    )
  }
}
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default connect(mapStateToProps)(Home);