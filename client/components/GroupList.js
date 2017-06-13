import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from 'react-native';
import axios from 'axios';
import DatePicker from 'react-native-datepicker'
import styles from '../css/style';
import DrawerButton from './DrawerButton';
import { Container, Content, Card, CardItem, Footer, FooterTab, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

import CONFIG from '../../config/development.json';

class CreateList extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Your Groups',
    headerLeft: <DrawerButton navigation={navigation} />,
    drawerLabel: 'Your Groups',
  });
  constructor(props) {
    super(props)
    this.state = {
      groups: [1,2,3],
      // group_id: '',
      showLoading: false
    }
    this.props.styles = styles
    this.handleChatClick = this.handleChatClick.bind(this);
    this.removeGroup = this.removeGroup.bind(this);
    this.changeToMap = this.changeToMap.bind(this);
  }
  componentDidMount() {
    console.log('THIS IS THE PROPS', this.state.groups)
    this.getGroups(this.props.id)
  }

  handleChatClick(id) {
    console.log('click Id', id)
    AsyncStorage.setItem('roomId', JSON.stringify(id), () => {
      this.props.navigation.navigate('Messenger');
    });
  }

  removeGroup(group_id) {
    // this.setState({
    //   group_id: id,
    // })

    // const user = {
    //   group_id,
    //   user_id: this.props.id,
    //   email: this.props.email,
    // }
    // console.log('user object', user)

    axios.post(`${CONFIG.URL}/removegroup`, {
      group_id,
      user_id: this.props.id,
      email: this.props.email,
    })
    .then((res) => {
      console.log('this is the response',res)
      this.setState({
        groups: res.data,
      })
    })
    .catch((err) => {
       console.log('cant find match', err);
    });
  }

  getGroups = () => {
    this.setState({
      showLoading: true
    })
    fetch(`${CONFIG.URL}/grouplist`, {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.props.id
      }),
    })
    .then(res => (res.json()))
    .then((res) => {
      console.log('this is the response',res)
      this.setState({
        groups: res,
        showLoading: false
      })
    })
    .catch((err) => {
       console.log('cant find match', err);
    });
  }
  changeToMap() {

  }
  render() {
    return (
        <Container>
            <Content>
              {this.state.groups.map((item, idx) =>
                <Card key={idx} >
                    <CardItem>
                        <Left>
                            <Thumbnail key={idx + 1} source={{uri: item.img_url}} />
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
                      <CardItem key={idx + 2}>
                          <Button small rounded primary onPress={() => this.changeToMap()}>
                              <Text>Map</Text>
                          </Button><Text>   </Text>
                          <Button small rounded danger onPress={() => this.removeGroup(item.id)}>
                              <Text >Remove</Text>
                          </Button><Text>   </Text>
                          <Button small rounded primary onPress={() => this.handleChatClick(item.id)}>
                              <Text>Message</Text>
                          </Button>
                    </CardItem>
               </Card>
              )}
            </Content>
        </Container>
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
export default connect(mapStateToProps)(CreateList);

