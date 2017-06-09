// import React, { Component, PropTypes } from 'react';
// import {
// View,
// Text,
// } from 'react-native';
// // import SocketIOClient from 'socket.io-client';
// // import CONFIG from '../../config/development.json';
// import PubNub from 'pubnub';

// const pubnub = new PubNub({
//   subscribe_key: 'sub-c-44e30d18-4c19-11e7-b7ac-02ee2ddab7fe',
//   publish_key: 'pub-c-584834c0-fe57-43ab-927b-f993708f8776',

// });
// class clientPubNub extends Component {

//   componentDidMount() {
//     this.addPubNub();
//   }
//   addPubNub() {
//     pubnub.addListener({
//       status(statusEvent) {
//         if (statusEvent.category === 'PNConnectedCategory') {
//           console.log('need to check');
//         } else if (statusEvent.category === 'PNUnknownCategory') {
//           pubnub.setState({
//             state: { new: 'error' },
//           }, (status) => {
//             console.log(statusEvent.errorData.message);
//           });
//         }
//       },
//       message(message) {
//         console.log('message', message);
//       },
//     });
//     pubnub.subscribe({
//       channels: ['group1'],
//     });
//     pubnub.publish(
//       {
//         message: {
//           player: 'user1',
//           position: '[37.775037, -122.229411]',
//         },
//         channel: 'group1',
//       },
//     (status, response) => {
//       if (status.error) {
//         console.log(status.errorData);
//       } else {
//         console.log('message Published w/ timetoken', response.timetoken);
//       }
//     },
//   );
//   }

//   render() {
//     return (
//       <View>
//         <Text> Hello </Text>
//       </View>
//     );
//   }

// }

// export default clientPubNub;
