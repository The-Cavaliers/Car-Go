import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { AsyncStorage } from 'react-native';

class ChatterBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.onSend = this.onSend.bind(this);
    // Socket IO connection
    this.socket = SocketIOClient('http://localhost:3000');
    this.socketMessages = [];
    //Keeps listening to the server side message emission;
    //this.socket.on('message', this.onReceivedMessage);
    //initial user details
    this.socket.emit('add-user', { username: 'userName', groupname: 'groupName' });
  }
  componentWillMount() {
    console.log('in will mount ChatterBox', socket.on('connect'))
    AsyncStorage.getItem('AsyncProfile', (err, result) => {
      const AsyncProfile = JSON.parse(result);
      console.log('AsyncProfile', AsyncProfile);
      this.setState({
        messages: [
          {
            _id: 1,
            text: `Hi ${AsyncProfile.username} Welcome to chat!`, // input global state name here
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
  }
  onReceivedMessage(messages) {
    console.log(messages);
    this.setState({
      //socketMessages: this.state.socketMessages.concat([messages]),
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
