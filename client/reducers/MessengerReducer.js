import { GET_CHAT_ID } from '../actions/type';

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
    default:
      return state;
  }
}


export default messenger;
