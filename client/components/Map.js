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
import axios from 'axios';
import CONFIG from '../../config/development.json';


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
          latitude: 37.775037,
          longitude: -122.229411,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.6421,
        },
          isMapVisible: false,
          listOfRegions: {},
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
    axios.get(`${CONFIG.URL}/getMapDetails`)
    .then((response) => {
      const coords = {};
      response.data.forEach(function (item){
        coords.latitude = JSON.parse(item.from_coords)[0];
        coords.longitude = JSON.parse(item.from_coords)[1];
      });
      this.setState({listOfRegions: coords });

      console.log(this.state.listOfRegions);
    })
    .catch((error) =>{
      console.log(error);
    })
  }


  render() {
    return (
		<MapView
          style={styles.map}
          showsUserLocation={true}
          followUserLocation={true}
          showsCompass={true}
          showsPointsOfInterest={true}
          region={this.state.region}
          >
     this.state.listOfRegions.map((item, idx) => {
            return (
              <MapView.Marker key={idx}
                coordinate={item.coordinates}
               />
              )
              })
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

export default connect(mapStateToProps)(Maps);