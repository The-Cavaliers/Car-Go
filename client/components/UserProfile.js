import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  TouchableOpacity,
  Picker,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';

import { setProfile, loginProfile } from '../actions';
import DrawerButton from './DrawerButton';
import styles from '../css/style';
import { Container, Content, Button } from 'native-base';

class UserProfile extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Create Profile',
    headerLeft: <DrawerButton navigation={navigation} />,
    drawerLabel: 'User Profile',
  });
  constructor(props) {
    super(props);

    this.sendProfile = this.sendProfile.bind(this);
    this.changeProperty = this.changeProperty.bind(this);
    this.checkNumber = this.checkNumber.bind(this);
  }

  changeProperty(property, name) {
    const newProperty = {};
    newProperty[property] = name;
    this.props.setProfile(newProperty);
  }

 sendProfile() {
  const data = this.props;
  fetch('http://127.0.0.1:3000/saveProfile', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: data })
    })
    .then((res) => {
      this.props.navigation.navigate('Drawer');
    })
    .catch((error) => {
      console.log('error saving users profile: ', error);
      this.props.navigation.navigate('Drawer');
    });
}

  loadHomeScreen() {
    this.setState({
      profile: { ...this.state },
    });
    this.props.navigation.navigate('Drawer');
  }

  checkNumber(property, number){
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

  //  check each of the components and map their contents into another sub component


  render() {
    return (
      <Image source={require('../assets/group_Background.png')} style={styles.backgroundImage}>
        <ScrollView>
          <TextInput
            underlineColorIos="transparent"
            style={styles.input}
            onChangeText={first_name => this.changeProperty('first_name', first_name)}
            value={this.props.first_name}
            placeholder="First Name"
          />
          <TextInput
            underlineColorIos="transparent"
            style={styles.input}
            onChangeText={last_name => this.changeProperty('last_name', last_name)}
            value={this.props.last_name}
            placeholder="Last Name"
          />
          <TextInput
            underlineColorIos="transparent"
            style={styles.input}
            onChangeText={age => this.checkNumber('age', age)}
            value={this.props.age}
            placeholder="Age"
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
            onChangeText = {phone_number => this.checkNumber('phone_number', phone_number)}
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
           <Button block primary onPress={() => {
            this.sendProfile()
          }}>
            <Text style={styles.buttonText}>Save Profile</Text>
          </Button>
        </ScrollView>
      </Image>
    );
  }
}

const mapStateToProps = ({ preferences, loginProfile }) => {
  const {
    first_name,
    last_name,
    age,
    gender,
    phone_number,
    about_me,
    preferred_ride,
    language,
    pets,
    smoking,
    music_preference,
    existingUser,
  } = preferences;
  const {
    id,
    email,
  } = loginProfile;
  return {
    first_name,
    last_name,
    age,
    gender,
    email,
    about_me,
    pets,
    smoking,
    preferred_ride,
    language,
    music_preference,
    phone_number,
    id,
  };
};
export default connect(mapStateToProps, {
  setProfile,
  loginProfile,
})(UserProfile);
