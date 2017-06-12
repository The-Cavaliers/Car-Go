import React from 'react';
import {
  View,
  AsyncStorage,
  Button,
} from 'react-native';

class GroupRow extends React.Component {
  constructor(props) {
    super(props);
    this.joinRoom = this.joinRoom.bind(this);
  }

  joinRoom() {
    const newRoomId = this.props.roomId;
    console.log('props navigation', newRoomId)
    AsyncStorage.setItem('roomId', newRoomId, () => {
      this.props.navigation.navigate('ChatterBox');
    });
  }

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
