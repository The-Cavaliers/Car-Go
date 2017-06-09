import { LOGIN_PROFILE } from '../actions/type';

const INITIAL_STATE = {
  username: '',
  email: '',
  picture_url: '',
  token: '',
  social_provider: '',

};

function loginProfile(state = INITIAL_STATE, { type, data }) {
  switch (type) {
    case LOGIN_PROFILE:
      return {
        ...state,
        username: data.username,
        email: data.email,
        picture_url: data.picture_url,
        token: data.token,
        social_provider: data.social_provider,
      };
    default:
      return state;
  }
}


export default loginProfile;
