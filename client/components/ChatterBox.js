import React from 'react';
import { AsyncStorage } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import SocketIOClient from 'socket.io-client';
import CONFIG from '../../config/development.json';

import DrawerButton from './DrawerButton'; 
class ChatterBox extends React.Component {
  static navigationOptions= ({navigation}) => ({
    title: 'Chatter Box',
    headerLeft: <DrawerButton navigation={navigation} />,
    drawerLabel: 'ChatterBox',
  });
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.onSend = this.onSend.bind(this);
    this.storeMessages = this.storeMessages.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    // Keeps listening to the server side message emission;
    this.socket = SocketIOClient(CONFIG.URL);
    this.socket.on('message', this.onReceivedMessage);
    // initial user details
  }

  componentWillMount() {
    AsyncStorage.getItem('AsyncProfile', (err, result) => {
      const AsyncProfile = JSON.parse(result);
      console.log('AsyncProfile', AsyncProfile);
      this.setState({
        messages: [
          {
            _id: 1,
            text: `Hi ${AsyncProfile.username}!`, // input global state name here
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://facebook.github.io/react/img/logo_og.png',
            },
          },
        ],
      });
    });
  }

  componentDidMount() {
    // this.socket.emit('add-user', { username: 'userName', groupname: 'groupName' });
    // this.socketMessages = [];
  }

  onSend(messages = []) {
    this.socket.emit('message', messages[0]);
    this.storeMessages(messages);
  }

  onReceivedMessage(messages) {
    this.storeMessages(messages);
  }

  storeMessages(messages) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 1,
        }}
      />
    );
  }
}

export default ChatterBox;
