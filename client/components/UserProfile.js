import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  TouchableOpacity,
  Picker,
  TextInput,
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
      first: '',
      last: '',
      gender: '',
      phone: '',
      car: '',
      pets: '',
      mini_bio: '',
      music: '',
      about_me: '',
      car_model: '',
      music_preference: ''
    };
    this.loadHomeScreen = this.loadHomeScreen.bind(this);
    this.changeProperty = this.changeProperty.bind(this);
    this.numberChecker = this.numberChecker.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  changeProperty(property, name) {
    const newProperty = {};
    newProperty[property] = name;
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
  numberChecker(text){
  let newText = '';
  let numbers = '0123456789';
    for (var i=0; i < text.length; i++) {
         if(numbers.indexOf(text[i]) > -1 ) {
              newText = newText + text[i];
         }
         else {
               // your call back function
               alert("please enter numbers only");
          }
         this.setState({
          phone: newText
        });
     }
  }
  clearFields() {
    this.setState({
      first: '',
      last: '',
      gender: '',
      phone: '',
      car: '',
      pets: '',
      mini_bio: '',
      music: '',
      about_me: '',
      car_model: '',
      music_preference: ''
    })
  }

   updateUser(input) {
    this.setState({
      gender: input
    })
   }

  render() {
    return (
      <ScrollView style={styles.scrollContainer}>
        <TextInput
          underlineColorIos="transparent"
          style={styles.input}
          placeholder="Leaving From"
          onChangeText={first => this.setState({ first })}
          value={this.state.first}
          placeholder="First Name"
        />
        <TextInput
          underlineColorIos="transparent"
          style={styles.input}
          placeholder="Leaving From"
          onChangeText={last => this.setState({ last })}
          value={this.state.last}
          placeholder="Last Name"
        />
        <TextInput
          underlineColorIos="transparent"
          style={styles.input}
          placeholder="Leaving From"
          onChangeText={gender => this.setState({ gender })}
          value={this.state.gender}
          placeholder="Gender"
        />
        <Picker style={styles.picker} selectedValue = {this.state.gender} onValueChange = {this.updateUser}>
            <Picker.Item label = "Male" value = "Male" />
            <Picker.Item label = "Female" value = "Female" />
        </Picker>
        <TextInput
          style={styles.input}
          onChangeText = {(text)=> this.numberChecker(text)}
          keyboardType = 'numeric'
          value = {this.state.phone}
          maxLength = {10}
          placeholder="Phone Number"
        />
        <TextInput
          style={styles.input}
          onChangeText={car_model => this.setState({ car_model })}
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
          multiline = {true}
          numberOfLines = {4}
          onChangeText={(about_me) => this.changeProperty('about_me', about_me)}
          value={this.state.about_me}
          placeholder="Mini Bio"
        />
        <TextInput
          style={styles.input}
          onChangeText={(music_preference) => this.changeProperty('music_preference', music_preference)}
          value={this.state.music_preference}
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
