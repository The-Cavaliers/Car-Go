import React from 'react';
import {
  AsyncStorage,
  Button,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { DrawerView } from 'react-navigation';
import { DrawerItems } from 'react-navigation';

class DrawerContent extends React.Component {

  render() {
    const { container, profile, avatar, name, email } = styles;
    return (
      <View style={container}>
        <View style={profile}>
          <Image source={{ uri: this.props.picture_url }} style={avatar} />
          <Text style={name}>{this.props.username }</Text>
          <Text style={email}>{this.props.email }</Text>
        </View>
        <DrawerItems {...this.props} />
      </View>

    );
  }
}


const styles = {
  container: {
    flex: 1,
  },
  profile: {
    height: 200,
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 10,
  },
  email: {
    fontSize: 10,
    fontWeight: '500',
    color: '#fff',
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
  },
};
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
export default connect(mapStateToProps)(DrawerContent);
