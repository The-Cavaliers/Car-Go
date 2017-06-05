import { SET_PROFILE } from '../actions/type';

const INITIAL_STATE = {
  name: '',
  about_me: '',
  preferred_ride: '',
  language: '',
  music_preference: '',
};

const preferences = (state = INITIAL_STATE, { type, data }) => {
  const newState = { ...state };
  if (data) {
    for (var key in newState) {
      if (data[key] === undefined || newState[key] === data[key] || typeof data[key] !== 'string') {
        console.log('ERROR SETTING STATE FOR USER PROFILE');
      } else {
        newState[key] = data[key];
      }
    }
  }
  switch (type) {
    case SET_PROFILE:
      return newState;
    default:
      return state;
  }
};

export default preferences;
