import React, { Component, PropTypes } from 'react';
import {
View,
Text,
AsyncStorage,
Mapview,
StyleSheet,
} from 'react-native';
import pick from 'lodash/pick';
import MapView from 'react-native-maps';
import DrawerButton from './DrawerButton';
import axios from 'axios';
import { addPubNubListener, addPubNubPublisher, unSubscribe, pubnubStop } from '../services/pubnubClient';

class clientPubNub extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Chatter Box',
    headerLeft: <DrawerButton navigation={navigation} />,
    drawerLabel: 'ChatterBox',
  });
  constructor(props) {
    super(props);
    this.state = {
      channelName: '',
      channelUserRole: '',
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      isMapVisible: false,
      routeCoordinates: [],
    };
    navigator.geolocation.clearWatch(this.watchId);
  }

  componentDidMount() {
    
    console.log('Mahimammmmmm');
    AsyncStorage.getItem('MapGroup', (err, group_data) => {
      this.state.channelName = JSON.parse(group_data).group;
      this.state.channelUserRole = JSON.parse(group_data).role;
      if (this.state.channelUserRole === 'Driver') {
        console.log('from carpool driver');
        this.watchUserPostion();
      } else {
        // this.addPubNubListener();
        addPubNubListener(this.state.channelName);

      }
    });
  }

  watchUserPostion() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const { routeCoordinates } = this.state;
      const newLatLngs = { latitude: position.coords.latitude, longitude: position.coords.longitude };
      const positionLatLngs = pick(position.coords, ['latitude', 'longitude']);
      //this.setState({ routeCoordinates: routeCoordinates.concat(positionLatLngs) });
      // alert(positionLatLngs);
      //this.addPubNubPublisher(positionLatLngs);
      const watchID = this.watchID;
      console.log("from Mapppppppp", watchID);
      // AsyncStorage.setItem('MapWatchId', JSON.stringify({ watchID: watchID}));
      AsyncStorage.getItem('MapGroup', (err, group_data) => {
      if (this.state.channelName === JSON.parse(group_data).group) {
      addPubNubPublisher( positionLatLngs, this.state.channelName, this.state.channelUserRole )
        }
    });
    },
    (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }


  render() {
    return (
      <MapView
        style={styles.map}
        showsUserLocation
        followUserLocation
        showsCompass
        showsPointsOfInterest
        overlays={[{
          coordinates: this.state.routeCoordinates,
          strokeColor: ['#f007'],
          lineWidth: 10,
        }]}
      />
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

export default clientPubNub;
