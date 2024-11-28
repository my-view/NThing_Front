import { ChatListType } from '~/types/chat';

export const tradeHistoryMenuList: ChatListType[] = [
  {
    id: 1,
    title: '타코야끼 같이 시켜먹으실 분~',
    last_message: {
      content: '좋아요~ 내일 정문에서 만나는걸로',
      sent_at: '2023-12-12 20:52:13',
    },
    trade_status: 'EXPECT',
  },
  {
    id: 2,
    title: '추석 잘 보내세요~~~',
    last_message: {
      content: '슬기님 추석 잘 보내세욥!',
      sent_at: '2023-12-12 20:52:13',
    },
    trade_status: 'RECRUIT',
  },
  {
    id: 3,
    title: '운동 같이 등록하실분 구합니다!',
    last_message: {
      content: '명국님 추석 잘 보내세욥',
      sent_at: '2023-12-12 20:52:13',
    },
    trade_status: 'CANCEL',
  },
  {
    id: 4,
    title: '피자 같이 배달시켜요~',
    last_message: {
      content: '은지님 추석 잘 보내세욥!',
      sent_at: '2023-12-12 20:52:13',
    },
    trade_status: 'COMPLETE',
  },
  {
    id: 5,
    title: '휴지 같이 사실분!',
    last_message: {
      content: '윤진님 추석 잘 보내세욥',
      sent_at: '2023-12-12 20:52:13',
    },
    trade_status: 'RECRUIT',
  },
];
