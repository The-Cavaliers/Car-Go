import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  // View,
  TouchableOpacity,
  // Image,
  // AsyncStorage,
  TextInput,
  // AppRegistry,
  ScrollView,
} from 'react-native';

import { setProfile } from '../actions';
import DrawerButton from './DrawerButton';
import styles from '../css/style';


class UserProfile extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Create Profile',
    headerLeft: <DrawerButton navigation={navigation} />,
    drawerLabel: 'User Profile',
  });
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      about_me: '',
      preferred_ride: '',
      language: '',
      music_preference: '',
    };
    this.loadHomeScreen = this.loadHomeScreen.bind(this);
    this.changeProperty = this.changeProperty.bind(this);
  }

  changeProperty(property, name) {
    const newProperty = {};
    newProperty[property] = name;
    // console.log('This is the new property: ', newProperty);
    this.props.setProfile(newProperty);
    console.log(this.props);
    // console.log(this.props);
  }

  loadHomeScreen() {
    this.setState({
      profile: { ...this.state },
    });
    this.props.navigation.navigate('Drawer');
  }

  render() {
    return (
      <ScrollView style={styles.scrollContainer}>
        <TextInput
          underlineColorIos="transparent"
          style={styles.input}
          placeholder="Leaving From"
          onChangeText={(name) => this.changeProperty('name', name)}
          value={this.props.name}
          placeholder="First Name"
        />
        <TextInput
          underlineColorIos="transparent"
          style={styles.input}
          placeholder="Leaving From"
          onChangeText={(name) => this.changeProperty('name', name)}
          value={this.props.name}
          placeholder="Last Name"
        />
        <TextInput
          underlineColorIos="transparent"
          style={styles.input}
          placeholder="Leaving From"
          onChangeText={(name) => this.changeProperty('name', name)}
          value={this.props.name}
          placeholder="Gender"
        />
        <TextInput
          style={styles.input}
          onChangeText={(about_me) => this.changeProperty('about_me', about_me)}
          value={this.props.about_me}
          placeholder="About me"
        />
        <TextInput
          style={styles.input}
            onChangeText={(preferred_ride) => {this.changeProperty('preferred_ride', preferred_ride)}}
          value={this.props.preferred_ride}
          placeholder="Preferred Ride"
        />
        <TextInput
          style={styles.input}
          onChangeText={(language) => this.changeProperty('language', language)}
          value={this.props.language}
          placeholder="Preferred Language"
        />
        <TextInput
          style={styles.input}
          onChangeText={(music_preference) => this.changeProperty('music_preference', music_preference)}
          value={this.props.music_preference}
          placeholder="Music Preferrence"
        />
        <TouchableOpacity onPress={this.loadHomeScreen} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Submit Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ preferences }) => {
  const {
    name,
    about_me,
    preferred_ride,
    language,
    music_preference,
  } = preferences;

  return {
    name,
    about_me,
    preferred_ride,
    language,
    music_preference,
  };
};

export default connect(mapStateToProps, {
  setProfile,
})(UserProfile);
