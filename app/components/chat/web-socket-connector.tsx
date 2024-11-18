import React, { useEffect } from 'react';
import { connect, stompClient } from 'assets/util/web-socket';
import { useUser } from 'hooks/user';
import { useChatRooms } from 'hooks/chatting/chat-rooms';
import useChatStore from 'state/chat';
import { IMessage } from '@stomp/stompjs';
import { ReceivedMessage } from 'types/chat';

const roomIds = [10];

const receiveUserMsg = (msg: IMessage) => {
  console.log('메시지 받았다', JSON.parse(msg.body));

  // 메시지 목록 왔을 때
  // if (msg.type...) addMessages(msg);
};

const receiveRoomMsg = (msg: IMessage) => {
  console.log('메시지 받았다', JSON.parse(msg.body));

  // 메시지 목록 왔을 때
  // if (msg.type...) addMessages(msg);

  // 새로운 메시지왔을 때
  // if (msg.type...) addMessage(msg);
};

// TODO: 이걸 컴포넌트가 아닌, 훅으로 만들지?
export const WebSocketConnector = () => {
  const { data: user } = useUser();
  const { data: chatRoomsRes } = useChatRooms();
  const { chatRooms, messages, setChatRooms, addMessage, addMessages } =
    useChatStore();

  useEffect(() => {
    console.log('웹소켓 연결 상태 ' + stompClient.connected);
    if (!user || stompClient.connected) return;
    // TODO: 채팅방 목록 불러와 subscribe
    connect(user.id, roomIds, receiveUserMsg, receiveRoomMsg);
  }, [user]);

  console.log('Im WebSocketConnector');
  return null;
};
