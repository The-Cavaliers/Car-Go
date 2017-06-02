import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage,
  TextInput,
  AppRegistry,
  ScrollView,
} from 'react-native';


class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      about_me: '',
      preferred_ride: '',
      language: '',
      music_preference: '',
      profile: {},
    };
    this.loadHomeScreen = this.loadHomeScreen.bind(this);
  }

  loadHomeScreen() {
    this.setState({
      profile: { ...this.state },
    });
    console.log('This is the state', this.state);
    this.props.navigation.navigate('Drawer');
  }

  render() {
    return (
      <ScrollView style={{ padding: 10 }}>
        <Text style={styles.details}>Your Name</Text>
        <TextInput
          style={styles.userInput}
          onChangeText={(name) => this.setState({ name })}
          value={this.state.text}
          placeholder="Name"
        />
        <Text style={styles.details}>About Me</Text>
        <TextInput
          style={styles.aboutMe}
          onChangeText={(about_me) => this.setState({ about_me })}
          value={this.state.text}
          placeholder="About me"
        />
        <Text style={styles.details}>Preferred Ride</Text>
        <TextInput
          style={styles.userInput}
            onChangeText={(preferred_ride) => {
              this.setState({
                preferred_ride: preferred_ride,
              });
            }
          }
          value={this.state.text}
          placeholder="Preferred Ride"
        />
        <Text style={styles.details}>Preferred Language</Text>
        <TextInput
          style={styles.userInput}
          onChangeText={(language) => this.setState({ language })}
          value={this.state.text}
          placeholder="Preferred Language"
        />
        <Text style={styles.details}>Music Preferrence</Text>
        <TextInput
          style={styles.userInput}
          onChangeText={(music_preference) => this.setState({ music_preference })}
          value={this.state.text}
          placeholder="Music Preferrence"
        />
        <TouchableOpacity onPress={this.loadHomeScreen} style={styles.navigationButton}>
          <Text>Submit Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}


const styles = {
  profilePageStyle: {
    backgroundColor: '#1abc9c',
  },
  userInput: {
    height: 30,
    borderColor: 'gray',
    margin: 10,
    paddingLeft: 30,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: 'black',
  },
  aboutMe: {
    height: 100,
    borderColor: 'gray',
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

module.exports.UserProfile = UserProfile;
export default UserProfile;
