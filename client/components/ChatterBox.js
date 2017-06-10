import React from 'react';
import { connect } from 'react-redux';
import { View, Text, AsyncStorage } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import socket from './services/socket.io';
import { loginProfile } from '../reducers/index';
import DrawerButton from './DrawerButton';

const avatar = require('../assets/carpool.png');

class ChatterBox extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Chatter Box',
    headerLeft: <DrawerButton navigation={navigation} />,
    drawerLabel: 'ChatterBox',
  });
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      roomId: 'default',
    };
    this.baseState = this.state;
    this.onSend = this.onSend.bind(this);
    this.storeMessages = this.storeMessages.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    // Keeps listening to the server side message emission;
    this.getRoomId = this.getRoomId.bind(this);
    socket.on('receive', this.onReceivedMessage);
    this.getRoomId();
  }

  getRoomId() {
    AsyncStorage.getItem('roomId', (err, roomId) => {
      const user = {
        roomId,
        username: this.props.username,
      }
      console.log('user joined on ', user)
      socket.emit('userJoined', user)
      this.setState({ roomId });
      // const message = {};
      // message.roomId = roomId;
      // socket.emit('userJoined', roomId);
    });
  }

  onSend(messages = []) {
    const newMessage = messages[0];
    newMessage.roomId = this.state.roomId;
    socket.emit('message', messages[0], this.state.roomId);
    this.storeMessages(messages);
  }

  onReceivedMessage(messages) {
    console.log('message receive on client', messages)
    this.storeMessages(messages);
  }

  storeMessages(messages) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  componentWillUnmount() {
    console.log('unmounting ChatterBox')
    this.setState(this.baseState);
    socket.emit('userLeft', this.state.roomId)
  }

  render() {
    const user = {
      _id: socket.id,
      name: this.props.username,
      avatar: this.props.picture_url,
    };
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={user}
      />
    );
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
  } = loginProfile;
  return {
    username,
    email,
    picture_url,
    token,
    social_provider,
    created_at,
  };
};


export default connect(mapStateToProps)(ChatterBox);
