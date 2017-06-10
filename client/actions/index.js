import { LOGIN_PROFILE, SET_PROFILE, MESSAGES } from './type';

export const createGroup = (index) => {
  return {
    type: 'Create_Group',
    index,
  };
};
export const joinGroup = (index) => {
  return {
    type: 'Join_Group',
    index,
  };
};

export const setProfile = (data) => {
  return {
    type: SET_PROFILE,
    data,
  };
};

const setLoginProfile = (data) => {
  return {
    type: LOGIN_PROFILE,
    data,
  };
};

export const setLoginProfileAsync = (data) => {
  //console.log('DATA FROM SETLOGINASYNC: ', data);
  return function (dispatch) {
    dispatch(setLoginProfile(data));
  };
};
