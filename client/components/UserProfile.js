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


const styles = {
  profilePageStyle: {
    backgroundColor: '#6bffff',
    padding: 10,
  },
  userInput: {
    height: 30,
    margin: 10,
    paddingLeft: 30,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: 'black',
  },
  aboutMe: {
    height: 100,
    margin: 10,
    paddingLeft: 30,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    borderRadius: 5,
    borderWidth: 3,
    borderColor: 'black',
  },
  details: {
    fontWeight: '900',
    alignSelf: 'center',
  },
  navigationButton: {
    borderRadius: 7,
    borderWidth: 6,
    borderColor: 'black',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
};


class UserProfile extends Component {
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
      <ScrollView style={styles.profilePageStyle}>
        <Text style={styles.details}>Your Name</Text>
        <TextInput
          style={styles.userInput}
          onChangeText={(name) => this.changeProperty('name', name)}
          value={this.props.name}
          placeholder="Name"
        />
        <Text style={styles.details}>About Me</Text>
        <TextInput
          style={styles.aboutMe}
          onChangeText={(about_me) => this.changeProperty('about_me', about_me)}
          value={this.props.about_me}
          placeholder="About me"
        />
        <Text style={styles.details}>Preferred Ride</Text>
        <TextInput
          style={styles.userInput}
            onChangeText={(preferred_ride) => {this.changeProperty('preferred_ride', preferred_ride)}}
          value={this.props.preferred_ride}
          placeholder="Preferred Ride"
        />
        <Text style={styles.details}>Preferred Language</Text>
        <TextInput
          style={styles.userInput}
          onChangeText={(language) => this.changeProperty('language', language)}
          value={this.props.language}
          placeholder="Preferred Language"
        />
        <Text style={styles.details}>Music Preferrence</Text>
        <TextInput
          style={styles.userInput}
          onChangeText={(music_preference) => this.changeProperty('music_preference', music_preference)}
          value={this.props.music_preference}
          placeholder="Music Preferrence"
        />
        <TouchableOpacity onPress={this.loadHomeScreen} style={styles.navigationButton}>
          <Text>Submit Profile</Text>
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
