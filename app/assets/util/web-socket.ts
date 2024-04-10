import { Frame, Stomp, StompConfig } from '@stomp/stompjs';
import { TOKEN_STORAGE_KEY, WEBSOCKET_SERVER_URL } from 'assets/util/constants';
import { getStorage } from 'assets/util/storage';
import { ChatMessage } from 'types/chat';

export const stompClient = Stomp.over(() => {
  const socket = new WebSocket(`${WEBSOCKET_SERVER_URL}/ws-stomp`);
  return socket;
});

export const connect = async (roomIds: number[]) => {
  const token = await getStorage(TOKEN_STORAGE_KEY);
  // console.log('웹소켓에 보낼 token  ' + token);
  stompClient.connect({ Authorization: `Bearer ${token}` }, (frame) => {
    console.log('hi connected', frame);
    roomIds.forEach((id) => {
      stompClient.subscribe(`/room/${id}`, (message) => {
        console.log('메시지 받았다', JSON.parse(message.body));
        // TODO: 실시간 푸시
        // setMessage(JSON.parse(message.body));
      });
    });
  });
};

export const send = async (roomId: number, message: string) => {
  const token = await getStorage(TOKEN_STORAGE_KEY);
  stompClient.send(
    `/send/${roomId}`,
    { Authorization: `Bearer ${token}` },
    JSON.stringify({ message }),
  );
};
