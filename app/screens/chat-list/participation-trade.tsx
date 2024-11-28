import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import styled from '@emotion/native';
import { getHeightRatio } from 'assets/util/layout';
import { ChatItem } from 'components/chat/chat-item';
import { useChatRooms } from 'hooks/chatting/chat-rooms';
import useChatStore from '~/state/chat';

const ChatListParticipationTradeScreen = ({ navigation }: any) => {
  const { data: chatRoomsRes } = useChatRooms(false);
  const { chatRooms, setChatRooms } = useChatStore();
  const data = Object.values(chatRooms) || [];

  useEffect(() => {
    if (!chatRoomsRes) return;
    setChatRooms(chatRoomsRes);
  }, [chatRoomsRes]);

  console.log('chatRoomsRes', chatRoomsRes);

  return (
    <Container>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ChatItem data={item} />}
      />
    </Container>
  );
};

const Container = styled(View)`
  padding: ${getHeightRatio(0)} 20px;
  height: 100%;
  background-color: #ffffff;
`;

export default ChatListParticipationTradeScreen;
