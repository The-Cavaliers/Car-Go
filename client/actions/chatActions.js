import { GET_CHAT_ID } from './type';

export const getChatId = chatId => ({
  type: GET_CHAT_ID,
  chatId,
});
