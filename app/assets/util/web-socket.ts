import { Frame, messageCallbackType, Stomp, StompConfig } from '@stomp/stompjs';
import { NT_ACCESS_TOKEN, WEBSOCKET_SERVER_URL } from 'assets/util/constants';
import { getStorage } from 'assets/util/storage';
import { ChatMessage, WebsocketMessageType } from 'types/chat';

export const stompClient = Stomp.over(() => {
  const socket = new WebSocket(`${WEBSOCKET_SERVER_URL}/stomp`);
  return socket;
});

export const connect = async (
  roomIds: number[],
  callback: messageCallbackType,
) => {
  const token = await getStorage(NT_ACCESS_TOKEN);
  // console.log('웹소켓에 보낼 token  ' + token);
  stompClient.connect({ Authorization: `Bearer ${token}` }, (frame) => {
    console.log('hi connected', frame);
    roomIds.forEach((id) => {
      stompClient.subscribe(`/room/${id}`, callback);
    });
  });
};

export const send = async (roomId: number, message: ChatMessage) => {
  const token = await getStorage(NT_ACCESS_TOKEN);
  stompClient.send(
    `/send-to/room/${roomId}`,
    { Authorization: `Bearer ${token}` },
    JSON.stringify(message),
  );
};
