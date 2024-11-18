import { messageCallbackType, Stomp } from '@stomp/stompjs';
import { TOKEN_STORAGE_KEY, WEBSOCKET_SERVER_URL } from 'assets/util/constants';
import { getStorage } from 'assets/util/storage';
import { ChatMessage } from 'types/chat';

export const stompClient = Stomp.over(() => {
  const socket = new WebSocket(`${WEBSOCKET_SERVER_URL}/stomp`);
  return socket;
});

export const connect = async (
  userId: number,
  roomIds: number[],
  userCallback: messageCallbackType,
  roomCallback: messageCallbackType,
) => {
  const token = await getStorage(TOKEN_STORAGE_KEY);
  stompClient.connect({ Authorization: `Bearer ${token}` }, (frame) => {
    console.log('hi connected', frame);
    stompClient.subscribe(`/user/${userId}`, userCallback);
    roomIds.forEach((id) => {
      stompClient.subscribe(`/chat/room/${id}`, roomCallback);
    });
  });
};

export const send = async (roomId: number, message: ChatMessage) => {
  const token = await getStorage(TOKEN_STORAGE_KEY);
  stompClient.send(
    `/stomp/send-to/room/message.${roomId}`,
    { Authorization: `Bearer ${token}` },
    JSON.stringify(message),
  );
};
