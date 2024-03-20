import React, { useEffect } from 'react';
import { connect, stompClient } from 'assets/util/web-socket';
import { useUser } from 'hooks/user';

export const WebSocketConnector = () => {
  const { data: user } = useUser();
  const roomIds = [1, 2, 3, 4];
  console.log('WebSocketConnector');
  useEffect(() => {
    console.log('웹소켓 연결 상태 ' + stompClient.connected);
    if (!user || stompClient.connected) return;
    // TODO: 채팅방 목록 불러와 subscribe
    connect(roomIds);
  }, [user]);

  return null;
};