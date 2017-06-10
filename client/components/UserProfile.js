import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  TouchableOpacity,
  Picker,
  TextInput,
  ScrollView,
} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import { setProfile, loginProfile } from '../actions';
import DrawerButton from './DrawerButton';
import styles from '../css/style';
import CONFIG from '../../config/development.json';



const radio_props = [
  {label: 'Driver', value: null },
  {label: 'Rider', value: 1 }
];

class UserProfile extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Create Profile',
    headerLeft: <DrawerButton navigation={navigation} />,
    drawerLabel: 'User Profile',
  });
  constructor(props) {
    super(props);
    console.log('htis is our id_____________', this.props)
    this.sendProfile = this.sendProfile.bind(this);
    this.changeProperty = this.changeProperty.bind(this);
    this.setPhoneNumber = this.setPhoneNumber.bind(this);
  }
  changeProperty(property, name) {
    console.log("this is name---------------- ",name)
    const newProperty = {};
    newProperty[property] = name;
    this.props.setProfile(newProperty);
    console.log(this.props);
  }

 sendProfile() {
  fetch('http://127.0.0.1:3000/saveprofile', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: this.props.first_name,
        last_name: this.props.last_name,
        age: this.props.age,
        gender: this.props.age,
        phone_number: this.props.phone_number,
        preferred_ride: this.props.preferred_ride,
        driver: this.props.driver,
        language: this.props.language,
        pets: this.props.pets,
        smoking: this.props.smoking,
        about_me: this.props.about_me,
        music_preference: this.props.music_preference,
        user_id: this.props.id,
      })
    })
    .then(res => (res.json()))
    .then((res) => {
      this.props.navigation.navigate('Drawer');
      // console.log('this is the response',res)
    })
    .catch((err) => {
      this.setState({
        showSearchError: true
      })
      //  console.log('cant find match', );
    });
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
    if (checkNumbers) {
      this.changeProperty(property, number);
    }
  }

  render() {
    return (
      <ScrollView style={styles.scrollContainer}>
        <TextInput
          underlineColorIos="transparent"
          style={styles.input}
          onChangeText={firstName => this.changeProperty('first_name', firstName)}
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
          onChangeText={age => this.changeProperty('age', age)}
          value={this.props.age}
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
          onChangeText={preferred_ride => this.changeProperty('preferred_ride', preferred_ride)}
          value={this.props.preferred_ride}
          placeholder="Vehicle Make & Model"
        />
        <TextInput
          style={styles.input}
          onChangeText={(language) => this.changeProperty('language', language)}
          value={this.props.language}
          placeholder="Language"
        />
        <TextInput
          style={styles.input}
          onChangeText={pets => this.changeProperty('pets', pets)}
          value={this.props.pets}
          placeholder="Pets"
        />
        <TextInput
          style={styles.input}
          onChangeText={smoking => this.changeProperty('smoking', smoking)}
          value={this.props.smoking}
          placeholder="Smoke"
        />
        <TextInput
          style={styles.bioinput}
          onChangeText={about_me => this.changeProperty('about_me', about_me)}
          value={this.props.about_me}
          placeholder="About Me"
          multiline={true}
          numberOfLines={4}
        />
        <TextInput
          style={styles.input}
          onChangeText={music_preference => this.changeProperty('music_preference', music_preference)}
          value={this.props.music_preference}
          placeholder="Music Preference"
        />
        <TouchableOpacity onPress={() => {
          this.sendProfile()
        }} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Submit Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ preferences, loginProfile }) => {
  const {
    first_name,
    last_name,
    age,
    about_me,
    pets,
    smoking,
    preferred_ride,
    language,
    music_preference,
    phone_number,
    user_id,
    driver,
  } = preferences;
  const {
    id,
  } = loginProfile;
  return {
    first_name,
    last_name,
    age,
    about_me,
    pets,
    smoking,
    preferred_ride,
    language,
    music_preference,
    phone_number,
    user_id,
    driver,
    id,
  };
};
export default connect(mapStateToProps, {
  setProfile,
  loginProfile,
})(UserProfile);