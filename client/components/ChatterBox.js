import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import SocketIOClient from 'socket.io-client';
import CONFIG from '../../config/development.json';

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
      username: '',
      picture_url: '',
      userId: null,
      roomId: null,
    };
    this.onSend = this.onSend.bind(this);
    this.storeMessages = this.storeMessages.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    // Keeps listening to the server side message emission;
    this.socket = SocketIOClient(CONFIG.URL);
    this.checkUserId = this.checkUserId.bind(this);
    this.giveFirstMessage = this.giveFirstMessage.bind(this);
    this.getRoomId = this.getRoomId.bind(this);
  }

  componentDidMount() {
    this.giveFirstMessage();
    this.getRoomId();
    this.checkUserId();
    this.socket.on('receive', this.onReceivedMessage);
  }

  getRoomId() {
    AsyncStorage.getItem('roomId', (err, roomId) => {
      this.setState({ roomId });
    })
    .then((roomId) => {
      const message = {};
      message.roomId = roomId;
      console.log('ROOM ID', roomId)
      this.socket.emit('userJoined', roomId)
    })
  }

  onSend(messages) {
    const newMessage = messages[0];
    newMessage.roomId = this.state.roomId;
    this.socket.emit('message', newMessage);
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

  giveFirstMessage() {
    AsyncStorage.getItem('AsyncProfile', (err, result) => {
      const AsyncProfile = JSON.parse(result);
      this.setState({
        messages: [
          {
            _id: 1,
            text: `Hi ${AsyncProfile.username}!`, // input global state name here
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://static.vecteezy.com/system/resources/previews/000/147/625/original/carpool-vector.jpg',
            },
          },
        ],
        username: AsyncProfile.username,
        picture_url: AsyncProfile.picture_url,
      });
    });
  }

  checkUserId() {
    this.socket.on('connect', () => {
      this.setState({ userId: this.socket.id });
    });
  }

  render() {
    const user = {
      _id: this.state.userId || -1,
      name: this.state.username,
      avatar: this.state.picture_url,
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

export default ChatterBox;
