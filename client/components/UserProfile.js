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
    this.loadHomeScreen = this.loadHomeScreen.bind(this);
    this.changeProperty = this.changeProperty.bind(this);
    this.setPhoneNumber = this.setPhoneNumber.bind(this);
    // this.clearFields = this.clearFields.bind(this);
  }

  changeProperty(property, name) {
    const newProperty = {};
    newProperty[property] = name;
    this.props.setProfile(newProperty);
    console.log(this.props);
  }

  loadHomeScreen() {
    this.setState({
      profile: { ...this.state },
    });
    this.props.navigation.navigate('Drawer');
  }
  setPhoneNumber(property, number){
    var hasNumber = /\d/;
    var checkNumbers = true;
    for (var i = 0; i < number.length; i++) {
      var testNumber = number[i] * 1
      if (!hasNumber.test(testNumber)) {
        checkNumbers = false;
        alert('please enter a number');
      }
    }
    console.log('THIS IS THE NUMBER', property)
    if (checkNumbers) {
      this.changeProperty(property, number);
    }
  }
  // clearFields() {
  //   this.setState({
  //     first: '',
  //     last: '',
  //     gender: '',
  //     phone: '',
  //     car: '',
  //     pets: '',
  //     mini_bio: '',
  //     music: '',
  //   })
  // }


  render() {
    return (
      <ScrollView style={styles.scrollContainer}>
        <TextInput
          underlineColorIos="transparent"
          style={styles.input}
          onChangeText={firstName => this.changeProperty('firstName', firstName)}
          value={this.props.first_name}
          placeholder="First Name"
        />
        <TextInput
          underlineColorIos="transparent"
          style={styles.input}
          onChangeText={lastName => this.changeProperty('last_name', lastName)}
          value={this.props.last_name}
          placeholder="Last Name"
        />
        <TextInput
          underlineColorIos="transparent"
          style={styles.input}
          onChangeText={gender => this.changeProperty('gender', gender)}
          value={this.props.gender}
          placeholder="Gender"
        />
        <TextInput
          style={styles.input}
          onChangeText = {digits => this.setPhoneNumber('phone_number', digits)}
          value = {this.props.phone_number}
          maxLength = {10}
          placeholder="Phone Number"
        />
        <TextInput
          style={styles.input}
          onChangeText={preferred_ride => this.setState({ car_model })}
          value={this.state.car_model}
          placeholder="Car Model"
        />
        <TextInput
          style={styles.input}
          onChangeText={(language) => this.changeProperty('language', language)}
          value={this.props.language}
          placeholder="Pets"
        />
        <TextInput
          style={styles.bioinput}
          onChangeText={(about_me) => this.changeProperty('about_me', about_me)}
          value={this.props.about_me}
          placeholder="Mini Bio"
        />
        <TextInput
          style={styles.input}
          onChangeText={(music_preference) => this.changeProperty('music_preference', music_preference)}
          value={this.props.music_preference}
          placeholder="Music Preference"
        />
        <TouchableOpacity onPress={() => {
          this.clearFields()
          //this.loadHomeScreen()
        }} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Submit Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ preferences }) => {
  const {
    first_name,
    last_name,
    about_me,
    preferred_ride,
    language,
    music_preference,
    phone_number,
  } = preferences;

  return {
    first_name,
    last_name,
    about_me,
    preferred_ride,
    language,
    music_preference,
    phone_number,
  };
};

export default connect(mapStateToProps, {
  setProfile,
})(UserProfile);
