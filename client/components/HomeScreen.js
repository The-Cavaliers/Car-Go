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
  AsyncStorage,

} from 'react-native';
import TabView from 'react-native-scrollable-tab-view';
import JoinGroupScreen from './JoinGroupScreen';
import CreateGroup from './CreateGroup';
import axios from 'axios';
import { connect } from 'react-redux';
import DrawerButton from './DrawerButton';
import GroupsButton from './GroupsButton';
import Map from './Map';
import CONFIG from '../../config/development.json';
import * as actions from '../actions';


const Auth0Lock = require('react-native-lock');

const lock = new Auth0Lock({
  clientId: CONFIG.auth0.clientId,
  domain: CONFIG.auth0.domain,
});


class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'CarGo',
    headerLeft: <DrawerButton navigation={navigation} />,
    drawerLabel: 'Home',
    headerRight: <GroupsButton navigation={navigation} />,
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
        username: '',
        region: {
          latitude: 37.783692,
          longitude: -122.408967,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        isMapVisible: false,
        isLoggedIn: false
      }
    this._login = this._login.bind(this);
  };

  componentDidMount () {
    console.log('HHHHHHHHHHH', this.props)
    if(this.props.username === '') {
      this._login();
    }
    navigator.geolocation.getCurrentPosition((position) => {
      var initialPosition = JSON.stringify(position);
      // console.log('JSON', initialPosition);
      // console.log('POSITION', position);
      this.setState({
        region:  {
          latitude: 37.783692,
          longitude: -122.408967,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          loc: 0,
        },
        isMapVisible: true,
      })
    },
    (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 500}
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  _login() {
    lock.show({}, (err, profile, token) => {
      console.log("PROFILE PROFILE PROFILE", profile)
      if (err) {
        console.log(err);
        return;
      }
      const social_provider = profile.identities[0].provider;
      const username = social_provider === 'auth0' ? profile.nickname : profile.name;
      const newUser = {
        username,
        email: profile.email,
        picture_url: profile.picture,
        token: token.accessToken,
        social_provider,
        user_id: profile.userId,
      }
      console.log('NEW USER IS', newUser)
      this.props.setLoginProfileAsync(newUser);
      axios.post(`${CONFIG.URL}/sign-login`, newUser)
      .then((response) => {
        console.log('response from /sign-up server', response.data[1][0]);
      })
      .catch((error) => {
        console.log('error from /sign-up', error);
      });
    });
  }
  render() {
    return (

      <TabView tabBarPosition={'bottom'} initialPage={1}>

        <JoinGroupScreen tabLabel='Find a Ride' />

        <Map tabLabel='View Map' />

        <CreateGroup tabLabel='Create Group' />

      </TabView>
    )
  }
}
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
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
    user_id,
  } = loginProfile;
  return {
    username,
    email,
    picture_url,
    token,
    social_provider,
    created_at,
    id,
    user_id,
  };
};


export default connect(mapStateToProps, actions)(Home);
