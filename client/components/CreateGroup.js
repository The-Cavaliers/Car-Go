import * as actions from '../actions';
import { connect } from 'react-redux';
import { Container, Content, Button } from 'native-base';
import React, { Component } from 'react';
import axios from 'axios';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import styles from '../css/style';
import DrawerButton from './DrawerButton';

import SearchResults from './SearchResults';
import DatePicker from 'react-native-datepicker'


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
      leavingFrom: '',
      username: '',
      user_id: '',
      email: '',
      picture_url: '',
      goingTo: '',
      date: new Date(),
      user_img: this.props.picture_url,
      seats: 1,
      leavingResults: [],
      goingResults: [],
    }
    this.checkDestination = this.checkDestination.bind(this);
    this.getDestination = this.getDestination.bind(this);
    this.setSeats = this.setSeats.bind(this);
    this.handleAddGroupClick = this.handleAddGroupClick.bind(this);
  }

  handleAddGroupClick() {
    if (!this.state.leavingFrom.length) {
      alert("Please enter from where you're leaving from");
    } else if (!this.state.goingTo.length) {
      alert("Please enter your destination");
    } else {  
      this.addGroup(); 
    }
  }

  addGroup() {
    if (this.state.leavingFrom === this.state.goingTo) {
      alert('Starting point cannot be the same as the destination');
      return;
    } 
    const data = {
      username: this.props.username,
      email: this.props.email,
      picture_url: this.props.picture_url,
      user_id: this.props.id,
      going_to: this.state.goingTo,
      leaving_from: this.state.leavingFrom,
      travelDate: this.state.date,
      seats: this.state.seats,
    }

    axios.post(`${CONFIG.URL}/newgroup`, data)
    .then((response) => {
      this.props.navigation.navigate('GroupList');
    })
    .catch((err) => {
      console.log('cant find match', err);
    });
  }


  setSeats() {
    if (this.state.seats >= 3) {
      alert('Maximum of three seats');
    } else {
      const newSeatCount = this.state.seats + 1
      this.setState({
        seats: newSeatCount,
      });
    }
  }

  checkDestination(travelQuery, destination) {
    axios.post(`${CONFIG.URL}/check-destination`, { destination })
    .then((data) => {
      if (data.data.length === 0) {
        travelQuery === 'leaving_from' ? this.setState({ leavingResults: [] }) : this.setState({ goingResults: [] });
        alert('Could not find a city');
      }
      let dest = data.data
      travelQuery === 'leaving_from' ? this.setState({ leavingResults: dest }) : this.setState({ goingResults: dest });
    })
    .catch((error) => {
      console.log('ERROR FINDING DESTINATION', error);
    })
  }

  getDestination(destination, type) {
    type === 'going_to' ? this.setState({ goingTo: destination, goingResults: [] }) : this.setState({ leavingFrom: destination, leavingResults: [] });
  }

  render() {
    return (

      <Image source={require('../assets/group_Background.png')} style={styles.backgroundImage}>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            underlineColorIos="transparent"
            onChangeText={leavingFrom => this.setState({ leavingFrom })}
            value={this.state.leavingFrom}
            placeholder="Leaving From"
          />

          <View style={{paddingBottom: 10}}>

          <Button  style={{height: 30, width: 150, justifyContent: 'center', alignSelf: 'center'}} onPress={() => {this.checkDestination('leaving_from', this.state.leavingFrom)}}>
            <Text style={styles.buttonText}>Search For City</Text>
          </Button>

          </View>

          {this.state.leavingResults.length ? 
            this.state.leavingResults.map((destination, index) => {
              return (
                <SearchResults style={styles.input} key={index} destination={destination} getDestination={this.getDestination} type={'leaving_from'}/> 
              )
          }) : null}

          <TextInput
            underlineColorIos="transparent"
            style={styles.input}
            onChangeText={goingTo => this.setState({ goingTo })}
            value={this.state.goingTo}
            placeholder="Going To"
          />
          <View style={{paddingBottom: 10}}>

          <Button style={{height: 30, width: 150, justifyContent: 'center', alignSelf: 'center', }} onPress={() => {this.checkDestination('going_to', this.state.goingTo)}}>
            <Text style={styles.buttonText}>Search For City</Text>
          </Button>
          </View>

          {this.state.goingResults.length ? 
            this.state.goingResults.map((destination, index) => {
              return (
                <SearchResults style={styles.input} key={index} destination={destination} getDestination={this.getDestination} type={'going_to'} /> 
              )
          }) : null}


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
            minDate={new Date()}
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
            <Button primary onPress={this.setSeats}>
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
