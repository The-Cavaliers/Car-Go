const Auth0Lock = require('react-native-lock');
const lock = new Auth0Lock({ clientId: 'LFEbCRSP77eRVJTN4x91aGqrnuZSbXfC', domain: 'phongtlam.auth0.com' });

const FbLogin = () => {
  lock.show({}, (err, profile, token) => {
    if (err) {
      console.log(err);
      return;
    }
    // Authentication worked!
    console.log('Logged in with Auth0!');
  });
}

export default FbLogin;
