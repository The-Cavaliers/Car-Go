// actions are plain JS objects


export function createGroup(index) {
  return {
    type: 'Create_Group',
    index,
  };
}
export function joinGroup(index) {
  return {
    type: 'Join_Group',
    index,
  };
}

export function setProfile(profileDetails) {
  return {
    type: 'SET_PROFILE',
    profileDetails,
  };
}
