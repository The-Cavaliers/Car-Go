import { SET_PROFILE, LOGIN_PROFILE } from './type';

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

export const setLoginProfile = (data) => {
  setTimeout(function() {
    return {
      type: LOGIN_PROFILE,
      data,
    };
  }, 1000);
};

export const setProfile = (data) => {
  return {
    type: SET_PROFILE,
    data,
  };
};

