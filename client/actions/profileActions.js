import { LOGIN_PROFILE, SET_PROFILE } from './type';

export const setProfile = data => ({
  type: SET_PROFILE,
  data,
});

export const setLoginProfile = data => ({
  type: LOGIN_PROFILE,
  data,
});
