import { SET_PROFILE } from './type';

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

