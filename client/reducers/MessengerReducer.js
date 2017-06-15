import { GET_CHAT_ID, RECEIVE_MSG } from '../actions/type';

const INITIAL_STATE = {
  chatId: '',
  messages: [],
};

function messenger(state = INITIAL_STATE, { type, chatId, messages }) {
  switch (type) {
    case GET_CHAT_ID:
      return {
        ...state,
        chatId,
      };
    case RECEIVE_MSG:
      return {
        ...state,
        messages,
      };
    default:
      return state;
  }
}


export default messenger;
