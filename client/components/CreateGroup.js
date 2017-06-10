import * as actions from '../actions';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import styles from '../css/style';
import DrawerButton from './DrawerButton';

class CreateGroup extends Component {
  static navigationOptions= ({navigation}) => ({
    title: 'Create Group',
    headerLeft: <DrawerButton navigation={navigation} />,
    drawerLabel: 'Create Group',
  });
    constructor(props) {
    super(props)
    this.state = {
      showCityError: false,
      LeavingFrom: '',
      username: '',
      user_id: '',
      email: '',
      picture_url: '',
      goingTo: '',
      date: new Date(),
      user_img: 'person.png'
    }
  }

  handleAddGroupClick = () => {
    var cities = {'Oakland': true, 'San Francisco':true, 'Sunnyvale': true, 'Mt. View': true, 'Hayward': true, 'Palo Alto': true, 'Santa Clara': true, 'Cupertino': true, 'Fremont': true, 'San Jose': true, 'San Mateo': true, 'Santa Clara': true};
      if(cities[this.state.LeavingFrom] && cities[this.state.goingTo]) {
        this.addGroup();
        this.setState({
          showCityError: false
        })
      } else {
        console.log('we have an loser')
        this.setState({
          showCityError: true
        })
      }
    this.setState({
      LeavingFrom: '',
      goingTo: '',
      date: false
    })
  }
  addGroup = () => {
    fetch('http://127.0.0.1:3000/newgroup', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.props.username,
        email: this.props.email,
        picture_url: this.props.picture_url,
        user_id: this.props.id,
        going_to: this.state.goingTo,
        leaving_from: this.state.LeavingFrom,
        travelDate: this.state.date,
      }),
    })
    .then((res) => {
      res.json()
    })
    .then((res) => {
      console.log('this is the response',res)
    })
    .catch((err) => {
      this.setState({
        showError: true
      })
       console.log('cant find match', err);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.icon} source={{uri:this.state.picture_url }} />

        <View style={styles.inputContainer}>
          {this.state.showCityError ? <Text style={styles.error}>Not available in this city, try another location</Text> : null}
          <TextInput
            underlineColorIos="transparent"
            style={styles.input}
            onChangeText={LeavingFrom => this.setState({ LeavingFrom })}
            value={this.state.LeavingFrom}
            placeholder="Leaving From"
          />
          <TextInput
            underlineColorIos="transparent"
            style={styles.input}
            onChangeText={goingTo => this.setState({ goingTo })}
            value={this.state.goingTo}
            placeholder="Going To"
          />
          <DatePicker
            style={{width: 200}}
            date={this.state.date}
            mode="date"
            placeholder="Select Date"
            format="MM-DD-YYYY"
            minDate="06-01-2017"
            maxDate="01-10-2021"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({date: date})}}
          />
          <TouchableOpacity onPress={this.handleAddGroupClick} style={styles.buttonContainer}>
            <Text style={styles.buttonText}> Create New Group</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
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
    user_id,
    id,
  } = loginProfile;
  return {
    username,
    email,
    picture_url,
    token,
    social_provider,
    created_at,
    user_id,
    id,
  };
};

export default connect(mapStateToProps)(CreateGroup);
