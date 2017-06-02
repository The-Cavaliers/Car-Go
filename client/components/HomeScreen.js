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

import DrawerButton from './DrawerButton';
import MapView from 'react-native-maps';



export default class Home extends Component {

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
  constructor(props) {
    super(props);
      this.state ={
        region: {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
      }
    };
  
  watchID: ?number = null;

  componentDidMount () {
    navigator.geolocation.getCurrentPosition((position) => {
      var initialPosition = JSON.stringify(position);
      console.log('JSON', initialPosition);
      console.log('POSITION', position);
      this.setState({
        region:  {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          loc: 0,
        }
      })

    },
    (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
     this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      //console.log(lastPosition);
    });
  }

  // clicker() {
  //   console.log('in homescreen click')
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     console.log('POSITIOOM IS', position)
  //   },
  //   (error) => console.log('ERrrrrrrr', JSON.stringify(error)),
  //     {enableHighAccuracy: true, timeout: 50000, maximumAge: 1000}
  //   );
  // }

  render() {
    return (
			<MapView
				provider={MapView.PROVIDER_GOOGLE}
				style={styles.map}
				region={this.state.region}
			>
				<MapView.Marker
					coordinate={this.state.region}
					pinColor="red"

				/>
			</MapView>
    );
  }
}
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  containers: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  map: {
    flex: 1,
  },
});
