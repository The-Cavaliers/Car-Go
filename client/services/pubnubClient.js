import PubNub from 'pubnub';
import CONFIG from '../../config/development.json';
import Promise from 'bluebird';

const pubnub = new PubNub({
  subscribe_key: CONFIG.pubnub.subscribeKey,
  publish_key: CONFIG.pubnub.publishKey,

});

export const addPubNubListener = (channelName) => {
  console.log('from listener', channelName);
  pubnub.addListener({
    status(statusEvent) {
      if (statusEvent.category === 'PNConnectedCategory') {
        console.log('need to check');
      } else if (statusEvent.category === 'PNUnknownCategory') {
        pubnub.setState({
          state: { new: 'error' },
        }, (status) => {
          console.log(statusEvent.errorData.message);
        });
      }
    },
    message(message) {
      // console.log('message', message);
      // return (message.message.position);
      // alert(message);
    },
  });
  pubnub.subscribe({
    channels: [channelName],
  });
};

export const addPubNubPublisher = (positionLatLngs, channelName, userRole) => {
  pubnub.publish({
    message: {
      player: userRole,
      position: positionLatLngs,
    },
    channel: channelName,
  },
    (status, response) => {
      if (status.error) {
        console.log(status.errorData);
      } else {
        console.log('message Published w/ timetoken', response.timetoken, channelName);
      }
    });
};

export const unSubscribe = (channelName) => {
  pubnub.unsubscribe({
    channels: [channelName],
  });
};

export const unSubscribeAll = () => {
  console.log('from channel unsubscribeAll');
  pubnub.unsubscribeAll();
};

export const pubnubStop = () => {
  console.log('stoppp');
  pubnub.stop();
};

export const GetCurrentLocation = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    resolve({ lat: position.coords.latitude, long: position.coords.longitude });
  }, (error) => reject(error));
});
