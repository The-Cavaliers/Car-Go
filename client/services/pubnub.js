import PubNub from 'pubnub';
import CONFIG from '../../config/development.json';

let connection;

const presenceSubscriptions = new Set();

const messageSubscriptons = new Set();

const identifier = () => Math.random().toString(10).slice(12);

export const connect = () => {
  if (connection) {
    return connection;
  }
  // Connection
  connection = new Promise((resolve, reject) => {
    const uuid = identifier();
    const options = Object.assign({}, CONFIG.pubnub, { uuid });
    console.log(options);
    const pubnub = new PubNub(options);

      // Initial connection  Handler
    const initialHandler = {
      status: (statusEvent) => {
        switch (statusEvent.category) {
          case 'PNConnectedCategory':
          case 'PNNetworkUpCategory':
            resolve(pubnub);
            break;
          case 'PNDisconnectedCategory':
          case 'PNNetworkDownCategory':
            reject(new Error('Received a network-down message'));
            break;
          default:
            return;
        }
        // Remove the initialHandler
        pubnub.removeListener(initialHandler);
        pubnub.addListener({
          // Message  to be replaced by locationDetails Listener
          message() {
            messageSubscriptons.forEach(
              handler => handler(...arguments));
          },
          // user Presence Listener
          presence() {
            presenceSubscriptions.forEach(
              handler => handler(...arguments));
          },
          // Check if there is any disconnection
          status: (statusEvent) => {
            switch (statusEvent.category) {
              case 'PNDisconnectedCategory':
              case 'PNNetworkDownCategory':
                connect(); // reconnect
                break;
              default:
            }
          },
        });
      },
    };
    pubnub.addListener(initialHandler);
    return handshake(pubnub).then(() => resolve({ uuid, pubnub })).catch(reject);
  });
  return connection;
};

// Establising handshake
const handshake = pubnub =>
  new Promise((resolve, reject) => {
    pubnub.time((status) => {
      if (status.error) {
        reject(new Error(
          `PubNub service failed to respond to time request: ${status.error}`));
      } else {
        resolve(pubnub);
      }
    });
  });

