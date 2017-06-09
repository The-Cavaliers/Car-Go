import React, { Component, PropTypes } from 'react';
import {
View,
Text,
AsyncStorage,
Mapview,
StyleSheet,
} from 'react-native';
// import SocketIOClient from 'socket.io-client';
// import CONFIG from '../../config/development.json';
import PubNub from 'pubnub';
import pick from 'lodash/pick';
import MapView from 'react-native-maps';

const pubnub = new PubNub({
  subscribe_key: 'sub-c-44e30d18-4c19-11e7-b7ac-02ee2ddab7fe',
  publish_key: 'pub-c-584834c0-fe57-43ab-927b-f993708f8776',

});
class clientPubNub extends Component {
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
  }

  componentDidMount() {
    // Map
    navigator.geolocation.getCurrentPosition((position) => {
      const initialPosition = JSON.stringify(position);

      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          loc: 0,
        },
        isMapVisible: true,
      });
    },
    error => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );


    // PubNub
    AsyncStorage.getItem('MapGroup', (err, group_data) => {
      this.state.channelName = JSON.parse(group_data).group;
      this.state.channelUserRole = JSON.parse(group_data).role;
      if (this.state.channelUserRole === 'driver') {
        this.addPubNubPublisher();
      } else {
        this.addPubNubListener();
      }
    });
  }
  addPubNubListener() {
    pubnub.addListener({
      status(statusEvent) {
        if (statusEvent.category === 'PNConnectedCategory') {
          console.log('need to check');
        } else if (statusEvent.category === 'PNUnknownCategory') {
          pubnub.setState({
            state: { new: 'error' },
          }, (status) => {
            console.log(statusEvent.errorData.message);
          });
        }
      },
      message(message) {
        console.log('message', message);
      },
    });
    pubnub.subscribe({
      channels: [this.state.channelName],
    });
  }

  addPubNubPublisher() {
    console.log("from pub");
    this.watchUserPostion();
    pubnub.publish({
      message: {
        player: this.state.channelUserRole,
        position: '[37.775037, -122.229411]',
      },
      channel: this.state.channelName,
    },
    (status, response) => {
      if (status.error) {
        console.log(status.errorData);
      } else {
        console.log('message Published w/ timetoken', response.timetoken);
      }
    });
  }
  watchUserPostion() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const { routeCoordinates } = this.state;
      const newLatLngs = { latitude: position.coords.latitude, longitude: position.coords.longitude };
      const positionLatLngs = pick(position.coords, ['latitude', 'longitude']);
      this.setState({ routeCoordinates: routeCoordinates.concat(positionLatLngs) });

      console.log(positionLatLngs);
    });
  }

  componentWillUnMount() {
    pubnub.subscribe({
      channels: [this.state.channelName],
    });
  }

  render() {
    return (this.state.isMapVisible ?
      (
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

export default clientPubNub;
