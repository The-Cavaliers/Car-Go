import * as actions from '../actions';
import { connect } from 'react-redux';
import { Container, Content, Button } from 'native-base';
import React, { Component } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import styles from '../css/style';
import DrawerButton from './DrawerButton';
import NumberPicker from 'react-native-numberpicker';
import SearchResults from './SearchResults';

import CONFIG from '../../config/development.json';

class CreateGroup extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Create Group',
    headerLeft: <DrawerButton navigation={navigation} />,
    drawerLabel: 'Create Group',
  });
    constructor(props) {
    super(props)
    this.state = {
      showCityError: false,
      leavingFrom: '',
      username: '',
      user_id: '',
      email: '',
      picture_url: '',
      goingTo: '',
      date: '05-13-2017',
      user_img: 'person.png',
      seats: 1,
      leavingResults: [],
      goingResults: [],
    }
    this.checkDestination = this.checkDestination.bind(this);
    this.getDestination = this.getDestination.bind(this);
  }

  handleAddGroupClick = () => {
    var cities = {'Oakland': true, 'San Francisco':true, 'Sunnyvale': true, 'Mt. View': true, 'Hayward': true, 'Palo Alto': true, 'Santa Clara': true, 'Cupertino': true, 'Fremont': true, 'San Jose': true, 'San Mateo': true, 'Santa Clara': true };
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
      leavingFrom: '',
      goingTo: '',
      date: '01-01-2017'
    })
  }

  addGroup = () => {
    fetch(`${CONFIG.URL}/newgroup`, {
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
        leaving_from: this.state.leavingFrom,
        travelDate: this.state.date,
        seats: this.state.seats,
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

  incrementCount = () => {
    if(this.state.seats >= 3) {
      this.setState({
        seats: 0
      })
    } else {
      this.setState({
        seats: this.state.seats + 1
      });
    }
  }

  checkDestination(travelQuery, destination) {
    axios.post('http://127.0.0.1:3000/check-destination', { destination })
    .then((data) => {
      // console.log('THIS IS THE DATA', data);
      let dest = data.data
      travelQuery === 'leaving_from' ? this.setState({ leavingResults: dest }) : this.setState({ goingResults: dest });
    })
    .catch((error) => {
      console.log('there was an alert contacting the server', error);
    })
  }

  getDestination(destination, type) {
    type === 'going_to' ? this.setState({ goingTo: destination }) : this.setState({ leavingFrom: destination });
    console.log('GOING TO', this.state.leavingFrom);
  }

  render() {
    return (

      <Image source={require('../assets/group_Background.png')} style={styles.backgroundImage}>

        <View style={styles.inputContainer}>
          {this.state.showCityError ? <Text style={styles.error}>Not available in this city, try another location</Text> : null}

          <TextInput
            style={styles.input}
            underlineColorIos="transparent"
            onChangeText={leavingFrom => this.setState({ leavingFrom })}
            value={this.state.leavingFrom}
            placeholder="Leaving From"
          />

          <Button  onPress={() => {this.checkDestination('leaving_from', this.state.leavingFrom)}}>
            <Text style={styles.buttonText}>Check For Cities></Text>
          </Button>

          {this.state.leavingResults.length ? 
            this.state.leavingResults.map((destination, index) => {
              return (
                <SearchResults style={styles.input} destination={destination} getDestination={this.getDestination} type={'leaving_from'}/> 
              )
          }) : null}

          <TextInput
            underlineColorIos="transparent"
            style={styles.input}
            onChangeText={goingTo => this.setState({ goingTo })}
            value={this.state.goingTo}
            placeholder="Going To"
          />

          <Button onPress={() => {this.checkDestination('going_to', this.state.goingTo)}}>
            <Text style={styles.buttonText}>Check For Cities></Text>
          </Button>

          {this.state.goingResults.length ? 
            this.state.goingResults.map((destination, index) => {
              return (
                <SearchResults style={styles.input} destination={destination} getDestination={this.getDestination} type={'going_to'} /> 
              )
          }) : null}

          <DatePicker
            style={{width: 200, borderColor: '#fff'}}
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
                marginLeft: 36,
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({date: date})}}
          />

          <View style={styles.seatsContainer}>
            <Button primary onPress={this.incrementCount}>
              <Text style={styles.buttonText}>Seats</Text>
            </Button>

            <View style={styles.seatsTextHolder}>
              <Text style={styles.seatsText}>{this.state.seats}</Text>
            </View>
          </View>

          <Button block primary onPress={this.handleAddGroupClick}>
              <Text style={styles.buttonText}>Create New Group</Text>
          </Button>
        </View>
      </Image>
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
