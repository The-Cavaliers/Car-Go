import React from 'react';
import {
  View,
  AsyncStorage,
  Button,
} from 'react-native';

class GroupRow extends React.Component {
  constructor(props) {
    super(props);
    // this.socket = SocketIOClient(CONFIG.URL);
    this.joinRoom = this.joinRoom.bind(this);
  }

  joinRoom() {
    const newRoomId = this.props.roomId;
    console.log('props navigation', this.props.navigation)
    AsyncStorage.setItem('roomId', newRoomId, () => {
      this.props.navigation.navigate('ChatterBox');
    });
  }

  // leaveRoom() {
  //   AsyncStorage.getItem('roomId', (err, roomId) => {
  //     console.log('leaving id front', roomId);
  //     this.socket.emit('userLeft', roomId);
  //   })
  //   .then(() => {
  //     // this.joinRoom();
  //     this.props.navigation.navigate('ChatterBox');
  //   });
  // }

  render() {
    return (
      <View>
        <Button
          title="button"
          onPress={this.joinRoom}
        />
      </View>
    );
  }
}

export default GroupRow;
