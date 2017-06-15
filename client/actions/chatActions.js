import { GET_CHAT_ID, RECEIVE_MSG } from './type';

export const getChatId = chatId => ({
  type: GET_CHAT_ID,
  chatId,
});
