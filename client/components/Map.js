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
import pick from 'lodash/pick'
import MapView from 'react-native-maps';



const mapStateToProps = (state) => {
  return {
    state,
  }
}

class Maps extends Component {

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
          latitudeDelta: 0.0322,
          longitudeDelta: 0.6421,
        },
        isMapVisible: false,
        routeCoordinates: [],
      }
    };


  componentDidMount () {
    navigator.geolocation.getCurrentPosition((position) => {
      var initialPosition = JSON.stringify(position);
    //   console.log('JSON', initialPosition);
    //   console.log('POSITION', position);
      this.setState({
        region:  {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.3421,
          loc: 0,
        },
        isMapVisible: true,
      })
    },
    (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const { routeCoordinates } = this.state
      const newLatLngs = {latitude: position.coords.latitude, longitude: position.coords.longitude }  
      const positionLatLngs = pick(position.coords, ['latitude', 'longitude']);
      positionLatLngs.latitudeDelta = 0.0922,
      positionLatLngs.longitudeDelta = 0.0421,
      this.setState({ routeCoordinates: routeCoordinates.concat(positionLatLngs) })
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }


  render() {
    return (this.state.isMapVisible ?
      (
		<MapView
          style={styles.map}
          showsUserLocation={true}
          followUserLocation={true}
          showsCompass={true}
          showsPointsOfInterest={true}
          region={this.state.region}
          overlays={[{
            coordinates:this.state.routeCoordinates,
            strokeColor: '#19B5FE',
            lineWidth: 10,
          }]}
          />
      ) :
      (
        <View>
        <Text> loading ...</Text>
        </View>
      ));
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

export default connect(mapStateToProps)(Maps);