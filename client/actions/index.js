import { setProfile, setLoginProfile } from './profileActions';
import { getChatId } from './chatActions';

export const setProfileAsync = (data) => {
  return function (dispatch) {
    dispatch(setProfile(data));
  };
};

export const setLoginProfileAsync = (data) => {
  return function (dispatch) {
    dispatch(setLoginProfile(data));
  };
};

export const getChatIdAsync = chatId => (dispatch) => {
  dispatch(getChatId(chatId));
};
