import { GET_CHAT_ID, RECEIVE_MSG } from './type';

export const getChatId = chatId => ({
  type: GET_CHAT_ID,
  chatId,
});

export const onReceivedMessage = messages => ({
  type: RECEIVE_MSG,
  messages,
})
