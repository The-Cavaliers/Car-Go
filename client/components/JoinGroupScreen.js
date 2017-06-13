import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker'
import styles from '../css/style';
import DrawerButton from './DrawerButton';
import { Container, Content, Button } from 'native-base';
import axios from 'axios';

import CONFIG from '../../config/development.json';

class JoinGroup extends Component {
   static navigationOptions = ({navigation}) => ({
    title: 'Join Group',
    headerLeft: <DrawerButton navigation={navigation} />,
    drawerLabel: 'Join Group',
  });
  constructor(props) {
    super(props)
    var getDate = new Date()
    //getDate.slice(0,8)
    console.log(getDate)
    this.state = {
      showSearchError: false,
      groupsView: false,
      groupName: '',
      LeavingFrom: '',
      goingTo: '',
      groups: {},
      date: new Date(),
      user_img: 'person.png'
    }
    this.handleJoinClick = this.handleJoinClick.bind(this);
  }
  sendInputValues = () => {
    this.setState({
      LeavingFrom: '',
      goingTo: '',
      date: new Date()
    })
    this.getGroups();
  }
  componentDidMount() {
  }
  getGroups = () => {
    fetch('http://127.0.0.1:3000/groups', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        going_to: this.state.goingTo,
        leaving_from: this.state.LeavingFrom,
        travelDate: this.state.date,
      }),
    })
    .then(res => (res.json()))
    .then((res) => {
      this.setState({
        groups: res,
        groupsView: true,
        showSearchError: false

      })
      // console.log('this is the response',res)
    })
    .catch((err) => {
      this.setState({
        showSearchError: true
      })
      //  console.log('cant find match', );
    });
  }

  handleJoinClick = (email, id) => {
    console.log('email id', CONFIG.URL,  email, id)
    const user = {
      user_id: this.props.id,
      group_id: id,
    }
    this.sendEmail(email);
    axios.post(`${CONFIG.URL}/join-group`, user)
    .catch(err => { console.log('err', err) })
  }

  sendEmail = (email) => {
    fetch('http://127.0.0.1:3000/email', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
    .then(res => (res.json()))
    .catch((err) => {
    });
  }
  render() {
    return (
      <Image source={require('../assets/AdobeStock_55307183.jpeg')} style={styles.backgroundImage}>

        <View style={styles.inputContainer}>
          {this.state.showSearchError ? <Text style={styles.error}>No groups found, try another date</Text> : null}
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
                marginLeft: 36,
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({date: date})}}
          />
          <Button block primary onPress={this.sendInputValues}>
            <Text style={styles.buttonText}> Find a Ride</Text>
          </Button>
        </View>

        {this.state.groupsView ? <ScrollView>
          {this.state.groups.map((item, idx) =>
          <View key={idx} style={styles.group}>
            <Image style={styles.icon} source={require('../assets/person.png')} />
            <Text style={styles.name} >Group: {item.name}</Text>
            <Text style={styles.from} >From: {item.leaving_from}</Text>
            <Text style={styles.to}>To: {item.going_to}</Text>
            <Text style={styles.date}>Date: {item.travelDate}</Text>
            <TouchableOpacity onPress={() => this.handleJoinClick(item.email, item.id)} key={idx} style={styles.joinButton}>
             <Text style={styles.joinbuttonText}>Join</Text>
            </TouchableOpacity>
          </View>
          )}
          </ScrollView>
        : null}

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
    id,
  } = loginProfile;
  return {
    username,
    email,
    picture_url,
    token,
    social_provider,
    created_at,
    id,
  };
};

export default connect(mapStateToProps)(JoinGroup);
