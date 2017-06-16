import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker'
import styles from '../css/style';
import DrawerButton from './DrawerButton';
import { Container, Content, Card, CardItem, Footer, FooterTab, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import axios from 'axios';

import CONFIG from '../../config/development.json';
import SearchResults from './SearchResults';

class JoinGroup extends Component {
   static navigationOptions = ({navigation}) => ({
    title: 'Find Ride',
    headerLeft: <DrawerButton navigation={navigation} />,
    drawerLabel: 'Find Ride',
  });
  constructor(props) {
    super(props)
    var getDate = new Date()
    //getDate.slice(0,8)
    console.log(getDate)
    this.state = {
      leavingFrom: '',
      groupsView: false,
      groups: [],
      groupName: '',
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
    this.handleJoinClick = this.handleJoinClick.bind(this);
    this.getGroups = this.getGroups.bind(this);
    this.checkDestination = this.checkDestination.bind(this);
    this.getDestination = this.getDestination.bind(this);
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

  getGroups() {
    if (this.state.leavingFrom === this.state.goingTo) {
      alert('Starting point cannot be the same as the destination');
      return;
    } 
    if (!this.state.leavingFrom.length) {
      alert("Please enter from where you're leaving from");
      return;
    } else if (!this.state.goingTo.length) {
      alert("Please enter your destination");
      return;
    } 

    axios.post(`${CONFIG.URL}/groups`, {
      going_to: this.state.goingTo,
      leaving_from: this.state.leavingFrom,
      travelDate: this.state.date,
    })
    .then((res) => {
      console.log('RESPONSE*********', res);
      this.setState({
        groups: res.data,
        groupsView: true,
      })
      this.props.navigation.navigate('GroupList');
    })
    .catch((error) => {
      console.log('ERROR FINDING GROUP', error);
    });
  }

  handleJoinClick = (email, id, idx) => {
    const user = {
      user_id: this.props.id,
      group_id: id,
    }
    this.sendEmail(email);
    axios.post(`${CONFIG.URL}/join-group`, user)
    .then((val) => {
      const groups = this.state.groups;
      groups.splice(idx, 1);
      this.setState({ groups });
    })
    .catch(err => { console.log('err', err) })
  }

  sendEmail = (email) => {
    fetch(`${CONFIG.URL}/email`, {
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








         
          <DatePicker
            style={{width: 200, marginBottom: 10}}
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
            }}
            onDateChange={(date) => {this.setState({date: date})}}
          />
          <Button block primary onPress={this.getGroups}>
            <Text> Find a Ride</Text>
          </Button>
        </View>
      <Container>
        <Content>
          {this.state.groupsView ? <ScrollView>
            {this.state.groups.map((item, idx) =>
               <Card key={idx}>
                    <CardItem>
                        <Left>
                            <Thumbnail key={idx} source={{uri: item.img_url}} />
                            <Body>
                                <Text >{item.name}</Text>
                                <Text note>CarGo Driver</Text>
                            </Body>
                        </Left>
                        <Right>
                          <Text>Departing: {item.travelDate}</Text>
                        </Right>
                      </CardItem>
                      <CardItem>
                          <Body>
                          <Right>
                            <Text note>Leaving From: {item.leaving_from}</Text>
                          </Right>
                          <Left>
                            <Text note>Going to: {item.going_to}</Text>
                          </Left>
                          <Left>
                            <Text note>Available seats: {item.seats}</Text>
                          </Left>
                          </Body>
                      </CardItem>
                      <CardItem>
                          <Button transparent>
                          </Button><Text>                      </Text>
                          <Button small rounded primary onPress={() => this.handleJoinClick(item.email, item.id, idx)}>
                              <Text >Join</Text>
                          </Button><Text>                       </Text>
                          <Button transparent>
                          </Button>
                    </CardItem>
               </Card>
            )}
            </ScrollView>
          : null}
        </Content>
      </Container>

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

