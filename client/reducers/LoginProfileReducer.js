import { LOGIN_PROFILE } from '../actions/type';

const INITIAL_STATE = {
  username: '',
  email: '',
  picture_url: '',
  token: '',
  social_provider: '',
  created_at: '',
};

function loginProfile(state = INITIAL_STATE, { type, data }) {
  console.log('DATATATATA: ', data);
  switch (type) {
    case LOGIN_PROFILE:
      return {
        ...state,
        username: data.username,
        email: data.email,
        picture_url: data.picture_url,
        token: data.token,
        social_provider: data.social_provider,
        created_at: data.created_at,
      };
    default:
      return state;
  }
}


export default loginProfile;
