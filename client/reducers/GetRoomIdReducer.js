import { GET_ROOM_ID } from '../actions/type';

const INITIAL_STATE = {
  roomId: '',
};

const roomId = (state = INITIAL_STATE, { type, roomId }) => {

  switch (type) {
    case GET_ROOM_ID:
    return {
      ...state,
      roomId,
    };
    default:
      return state;
  }
};

export default roomId;