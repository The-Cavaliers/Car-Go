import PubNub from 'pubnub';

const pubnub = new PubNub({
  subscribe_key: 'sub-c-432580da-4d74-11e7-a368-0619f8945a4f',
  publish_key: 'pub-c-e90ade72-ceb0-46e8-a2e5-d5bd48ca6e8d',

});

export const addPubNubListener = (channelName) => {
  console.log("from listener", channelName);
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
      console.log('message', message);
      // alert(message);
    },
  });
  pubnub.subscribe({
    channels: [channelName],
  });
};

export const addPubNubPublisher = (positionLatLngs, channelName, userRole) => {
  console.log('from pub');
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
        console.log('message Published w/ timetoken', response.timetoken);
      }
    });
};

export const unSubscribe = (channelName) => {
  console.log("from unmount");
  pubnub.subscribe({
    channels: [channelName],
  });
};
