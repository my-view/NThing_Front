import React from 'react';
import { FlatList, View } from 'react-native';
import styled from '@emotion/native';
import { Font16W500, UnderLine14 } from 'components/common/text';
import { getHeightRatio } from 'assets/util/layout';
import { ChatItem } from '~/components/common/chat-item';
import { ChatListType } from '~/types/common';

const tradeHistoryMenuList: ChatListType[] = [
  {
    id: 1,
    title: '타코야끼 같이 시켜먹으실 분~',
    last_message: '좋아요~ 내일 정문에서 만나는걸로',
    navigate: 'heartTrade',
    trade_status: 'EXPECT',
  },
  {
    id: 2,
    title: '추석 잘 보내세요~~~',
    last_message: '슬기님 추석 잘 보내세욥!',
    navigate: 'MyTrade',
    trade_status: 'RECRUIT',
  },
  {
    id: 3,
    title: '운동 같이 등록하실분 구합니다!',
    last_message: '명국님 추석 잘 보내세욥',
    navigate: 'JoinTrade',
    trade_status: 'CANCEL',
  },
  {
    id: 4,
    title: '피자 같이 배달시켜요~',
    last_message: '은지님 추석 잘 보내세욥',
    navigate: 'JoinTrade',
    trade_status: 'COMPLETE',
  },
  {
    id: 5,
    title: '휴지 같이 사실분!',
    last_message: '윤진님 추석 잘 보내세욥',
    navigate: 'JoinTrade',
    trade_status: 'RECRUIT',
  },
];

const OpenedTradeScreen = ({ navigation }: any) => (
  <>
    <Container>
      <FlatList
        data={tradeHistoryMenuList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => <ChatItem data={item} />}
      />
    </Container>
  </>
);

const Container = styled(View)`
  /* padding: ${getHeightRatio(0)} 20px; */
  padding: 0;
  height: 100%;
  background-color: #ffffff;
`;

export default OpenedTradeScreen;
