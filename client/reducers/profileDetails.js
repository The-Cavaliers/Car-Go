function profileDetails(state = {}, action) {
  console.log('from profileDetails Reducer', state, action);
  switch(action.type) {
    case 'SET_PROFILE':
      return {
        ...state,
        // profileDetails: {
        //   username: '',
        //   email: '',
        //   id: '',
        //   picture_url: '',
        //   social_provider: '',
        //   token: '',
        // },
      };
    default:
      return state;
  }
}


export default profileDetails;
