import { Frame, Stomp } from '@stomp/stompjs';
import { TOKEN_STORAGE_KEY, WEBSOCKET_SERVER_URL } from 'assets/util/constants';
import { getStorage } from 'assets/util/storage';
import { IMessage } from 'types/chat';

export const stompClient = Stomp.over(() => {
  const socket = new WebSocket(`${WEBSOCKET_SERVER_URL}/ws-stomp`);
  return socket;
});

export const connect = async (roomIds: number[]) => {
  const token = await getStorage(TOKEN_STORAGE_KEY);
  // console.log('웹소켓에 보낼 token  ' + token);
  stompClient.connect({ Authorization: `Bearer ${token}` }, (frame: Frame) => {
    console.log('hi connected', frame.body);
    roomIds.forEach((id) => {
      stompClient.subscribe(`/room/${id}`, (message) => {
        console.log(JSON.parse(message.body));
        // TODO: 실시간 푸시
        // setMessage(JSON.parse(message.body));
      });
    });
  });
};

export const send = (roomId: number, message: IMessage) => {
  stompClient.send(
    `/send/${roomId}`,
    {},
    JSON.stringify({ message: message.text }),
  );
};
