import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import SocketIOClient from 'socket.io-client';
import CONFIG from '../../config/development.json';

class ChatterBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.onSend = this.onSend.bind(this);
    // Socket IO connection
    this.socket = SocketIOClient(CONFIG.URL);
    this.socketMessages = [];
    // Keeps listening to the server side message emission;
    // this.socket.on('message', this.onReceivedMessage);
    // initial user details
    this.socket.emit('add-user', { username: 'userName', groupname: 'groupName' });
  }
  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Welcome to chat!', // input global state name here
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),

   }));
    // emit the messages to server
    this.socket.emit('message',
      {
        message: messages,
        date: 'today',
        userName: 'May',
        groupName: 'ABC',
      });
    this.socket.on('message');
  }
  onReceivedMessage(messages) {
    console.log(messages);
    this.setState({
      // socketMessages: this.state.socketMessages.concat([messages]),
    });
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
