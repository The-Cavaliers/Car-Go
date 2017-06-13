import { GET_CHAT_ID } from '../actions/type';

const INITIAL_STATE = {
  chatId: '',
};

function getChatId(state = INITIAL_STATE, { type, chatId }) {
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


export default getChatId;
