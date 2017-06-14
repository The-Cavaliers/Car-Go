import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  View,
  AsyncStorage,
  StyleSheet,
} from 'react-native';
import pick from 'lodash/pick';
import MapView from 'react-native-maps';
import DrawerButton from './DrawerButton';
import MapButton from './MapButton';
import Polyline from '@mapbox/polyline';
import axios from 'axios';
import CONFIG from '../../config/development.json';
import PubNub from 'pubnub';
import { Button, Text } from 'native-base';

class clientPubNub extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'CarPool Map',
    headerLeft: <DrawerButton navigation={navigation} />,
    drawerLabel: 'CarPool Map',
  });

  constructor(props) {
    super(props);
    this.state = {
      channelName: '',
      channelUserRole: '',
      isRouteTracking: false,
      routeCoordinates: [],
      coords: [],
      riderCoords: {
        latitude: 37.33414,
        longitude: -122.047359,
      },
      Destination: '',
      Source: '',
      finalDestination: {},
      groupPublisherEmail: '',
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('MapGroup', (err, group_data) => {
      this.state.channelName = JSON.parse(group_data).group;
      this.state.channelUserRole = JSON.parse(group_data).role;
      this.state.groupPublisherEmail = JSON.parse(group_data).driverEmail;
      this.pubnub = new PubNub({
        subscribe_key: CONFIG.pubnub.subscribeKey,
        publish_key: CONFIG.pubnub.publishKey,
        //uuid:JSON.parse(group_data).userEmail,
        uuid: "abc126",
      });

      //Get the Destination Address from Group List for Unsubscribe
      //this.state.Destination = JSON.parse(group_data).goingTo;
      this.state.Destination = 'Hayward';
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.Destination}&key=${CONFIG.GoogleGeocoder.key}`)
      .then((data) => {
        this.state.finalDestination = data.data.results[0].geometry.location;
      })
      .catch((error) => {
        console.log('error from google', error);
      });
      if (this.state.channelUserRole === 'Driver') {
        this.watchUserPostion();
      } else if (this.state.channelUserRole === 'Rider') {
        this.addPubNubListener(this.state.channelName, 'Rider');
      }
    });
    //For Carpool live tracking on mount and unmount
    this.setState({
      isRouteTracking: true,
    });
  }

  //Stop tracking on Map when component unMounts
  componentWillUnmount() {
    this.state.isRouteTracking = false;
  }

  //For Publishing
  watchUserPostion() {
    let counter = 0;
    alert('Driver');
    // call the subscribe
    this.addPubNubListener(this.state.channelName, 'Driver');
    this.watchID = navigator.geolocation.watchPosition((position) => {
      let { routeCoordinates } = this.state;
      let newLatLngs = { latitude: position.coords.latitude, longitude: position.coords.longitude };
      const positionLatLngs = pick(position.coords, ['latitude', 'longitude']);
      //console.log(positionLatLngs);

      //For Carpool live tracking on mount and unmount
      if (this.state.isRouteTracking) {
        this.setState({ routeCoordinates: routeCoordinates.concat(positionLatLngs) });
      }
      //For conditional publishing with switched groups
      AsyncStorage.getItem('MapGroup', (err, group_data) => {
        if (this.state.channelName === JSON.parse(group_data).group) {
          //check if the destination has reached and unsubscribe
          if ((this.state.finalDestination.lat === positionLatLngs.latitude) && (this.state.finalDestination.lng === positionLatLngs.longitude)) {
            this.UnsubscribeRiders();
          }
          this.addPubNubPublisher(positionLatLngs, this.state.channelName, this.state.channelUserRole)
        }
      });
    },

      //Watch for every 1 sec of location change
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  //For Subscribing
  addPubNubListener = (channelName, Role) => {
    // alert("From listener");
    const that = this;
    let counter = 0;
    this.pubnub.addListener({
      message(message, event) {
        console.log(event);
        //discard the messages for Driver
        if (Role === 'Rider') {
          //For Carpool live tracking on mount and unmount
          if (that.state.isRouteTracking) {
            let { routeCoordinates } = that.state;

            //Get the driver position to estimate the arrival timings initially
            if (counter === 0) {
              that.getTimings(message.message.position);
              counter++;
            }
            if (message.message.player === 'Driver') {
              //Plot the received driver's positions on the map
              that.setState({ routeCoordinates: routeCoordinates.concat(message.message.position) });
            }
          }
        }
      }
    });
    this.pubnub.subscribe({
      channels: [channelName],
      withPresence: true
    });

    //Check if the Driver has joined yet or not
    if( Role === 'Rider') {
    this.pubnub.hereNow(
      {
        channels: [channelName],
        includeUUIDs: true,
        includeState: true
      },
      function (status, response) {
        // handle status, response
        let isDriverPresent = false;
        console.log("from presence", response.channels[channelName]['occupants'])
        response.channels[channelName]['occupants'].forEach(function (occupant) {
          if ((occupant.uuid === "abc126")) {
            isDriverPresent = true;
          }
        });
        if (!isDriverPresent) {
          alert("Driver did not start yet")
        }
      }
    );

  };
  }

  addPubNubPublisher = (positionLatLngs, channelName, userRole) => {
    //console.log('positions for publishing', positionLatLngs);

    this.pubnub.publish({
      message: {
        player: userRole,
        position: positionLatLngs,
      },
      channel: channelName,
      withPresence: true
    },
      (status, response) => {
        if (status.error) {
          console.log(status.errorData);
        } else {
          //console.log('message Published w/ timetoken', response.timetoken, channelName);
        }
      });
  };

  //Get the arrival timings of driver at Riders position
  getTimings = (currentDriverPosition) => {
    const key = CONFIG.GoogleGeocoder.key;
    const DriverPosition = currentDriverPosition.latitude + "," + currentDriverPosition.longitude;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var currentRiderPosition = '' + position.coords.latitude + "," + position.coords.longitude;
        this.setState({
          riderCoords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
        });
        axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${currentRiderPosition}&destination=${DriverPosition}&key=${key}`)
          .then((data) => {
            alert(`Driver will reach in ${data.data.routes[0].legs[0].duration.text}`);
          })
          .catch((error) => {
            console.log('error from google', error);
          });
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 100 }
    );
  }

  //Unsubscribe
  UnsubscribeRiders = () => {
    //check if the user reached the destination, and stop subscription  and publish
    navigator.geolocation.clearWatch(this.watchID);
    this.pubnub.unsubscribeAll();
    this.props.navigation.navigate('Home');
  }

  //RegionChange


  render() {
    var coord = this.state.routeCoordinates.slice(-1);
    return (
      <MapView
        style={styles.map}
        showsUserLocation={true}
        zoomEnabled={true}
        // followUserLocation
        showsCompass
        showsPointsOfInterest
        initialRegion={{
          latitude: 37.332211,
          longitude: -122.030778,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0421
        }}

      // overlays={[{
      //   coordinates: this.state.routeCoordinates,
      //   strokeColor: 'purple',
      //   strokeWidth: 5
      // }]}
      >
        <MapView.Polyline
          coordinates={this.state.routeCoordinates}
          strokeWidth={5}
          strokeColor="blue" />

        <MapView.Marker draggable
          coordinate={this.state.riderCoords}
          onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
        />

        <MapView.Marker
          coordinate={this.state.routeCoordinates[this.state.routeCoordinates.length-1]}
          title={"Driver"}
          image={require('../assets/car1.png')}
        />

        <Button small rounded danger onPress={() => this.UnsubscribeRiders()}>
          <Text>UnSubscribe</Text>
        </Button>
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
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

const mapStateToProps = ({ loginProfile }) => {
  const {
    username,
    email,
    picture_url,
    token,
    social_provider,
    created_at,
    id,
  } = loginProfile;
  return {
    username,
    email,
    picture_url,
    token,
    social_provider,
    created_at,
    id,
  };
};
export default connect(mapStateToProps)(clientPubNub);
