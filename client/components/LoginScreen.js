import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux'; // inject data where we need

import CONFIG from '../../config/development.json';
import Profile from './ProfileScreen';
import Header from './ProfileHeader';
import HomeScreen from './HomeScreen';
import * as actions from '../actions';


const Auth0Lock = require('react-native-lock');

const lock = new Auth0Lock({
  clientId: CONFIG.auth0.clientId,
  domain: CONFIG.auth0.domain,
});

const style = {
  profilePage: {
    height: '100%',
  },
};

class Login extends Component {
  static navigationOptions= ({navigation}) => ({
    title: 'Create Group',
    headerLeft: <DrawerButton navigation={navigation} />,
    drawerLabel: 'Create Group',
  });
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
    this.passState = this.passState.bind(this);
  }

  componentWillMount() {
    lock.show({}, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      // this.setState({ name: profile.name });
      console.log('profile:', profile);
      console.log('token:', token);
      axios.post(`${CONFIG.URL}/sign-login`, {
        username: profile.name,
        token: token.accessToken,
        email: profile.email,
        picture_url: profile.picture,
        provider: profile.identities[0].provider,
      })
      .then((response) => {
        console.log('response from /sign-up server', response.data[1][0]);
        this.props.setLoginProfileAsync(response.data[1][0]);
        console.log('NEW STATE FROM LOGIN: ', this.props);
      }).catch((error) => {
        console.log('ERROR SETTING NEW LOGIN PROFILE: ', error);
      });
    });
  }

  passState(data) {
    this.props.setLoginProfile(data);
  }

  render() {
    return (
      <View style={style.profilePage}>
        <Header headerText={`${this.state.username}'s Profile`} />
        <Profile
          {...this.props}
        />
      </View>
    );
  }
}


const mapStateToProps = ({ loginProfile }) => {
  const {
    username,
    email,
    picture_url,
    token,
    social_provider,
    created_at,
  } = loginProfile;
  return {
    username,
    email,
    picture_url,
    token,
    social_provider,
    created_at,
  };
};


export default connect(mapStateToProps, actions)(Login);
