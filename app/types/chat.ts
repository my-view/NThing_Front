export enum ChatStatusEnum {
  EXPECT = '거래예정',
  RECRUIT = '모집중',
  CANCEL = '거래취소',
  COMPLETE = '거래완료',
}

export type ChatStatus = keyof typeof ChatStatusEnum;

export type ChatListType = {
  id: number;
  title: string;
  last_message: { content: string; sent_at: string };
  trade_status: ChatStatus;
  image: string;
};

export interface ChatUser {
  _id?: string | number;
  name?: string;
  avatar?: string;
}

export enum WebsocketMessageType {
  NORMAL = 'TEXT',
  IMAGE = 'IMAGE',
  EXPEL = 'EXPEL', // 강퇴 발생 시 안내 메시지
  COMPLETE = 'COMPLETE', // 거래시간 지난 후, 거래 종료할지 묻고 답하는 메시지
  SATISFACTION = 'SATISFACTION', // 만족/불만족 묻고 답하는 메시지
  LIST = 'LIST', // 메시지 목록
}

export interface BaseReceivedMessage {
  chat_room_id: number;
  id: number;
}

export interface BaseReceivedChatMessage extends BaseReceivedMessage {
  sender_id: number | null;
  sent_at: string;
}

export interface NormalChatMessage extends BaseReceivedChatMessage {
  type: WebsocketMessageType.NORMAL;
  content: string;
}

export interface ImageChatMessage extends BaseReceivedChatMessage {
  type: WebsocketMessageType.IMAGE;
  url: string;
}

export interface CompleteChatMessage extends BaseReceivedChatMessage {
  type: WebsocketMessageType.COMPLETE;
}

export interface SatisfactionChatMessage extends BaseReceivedMessage {
  type: WebsocketMessageType.SATISFACTION;
  sent_at: string;
}

export type ReceivedMessage =
  | NormalChatMessage
  | ImageChatMessage
  | CompleteChatMessage
  | SatisfactionChatMessage;

// user 한테만
export interface ListMessage {
  chat_room_id: number;
  messages: ReceivedMessage[];
}

export interface _ChatRoomListItem {
  id: number;
  purchaseId: number;
  createdAt: string; // '2023-12-12 20:52:13'
  isDeleted: boolean;
  isCompleted: boolean;
}

export interface ChatRoomListItem {
  id: number;
  purchase: {
    id: number;
    image: string; // 저장된 이미지 목록 중 1번째 이미지
    title: string;
    numerator: number; // 참여자 수
    place: string;
    purchase_status: ChatStatus;
    isCompleted: boolean; // 완료 여부
    isSatisfied: boolean;
  };
  last_message: {
    message_id: number;
    message: string;
    sent_at: '2024-05-17 20:54:53';
  }; // 채팅방 목록 요청 시점에서 해당 채팅방의 최신 메시지 1개
  // isManager: boolean;
}
