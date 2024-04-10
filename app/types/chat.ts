export enum ChatStatus {
  EXPECT = '거래예정',
  RECRUIT = '모집중',
  CANCEL = '거래취소',
  COMPLETE = '거래완료',
}

export type ChatListType = {
  id: number;
  title: string;
  last_message: string;
  navigate: string;
  trade_status: keyof typeof ChatStatus;
};

export interface ChatUser {
  _id?: string | number;
  name?: string;
  avatar?: string;
}

export enum WebsocketMessageType {
  NORMAL = 'normal',
  IMAGE = 'image',
  KICK_OUT = 'kickOut', // 강퇴 발생 시 메시지
  COMPLETE = 'complete', // 거래 종료 시 메시지
  SATISFY = 'satisfy', // 만족/불만족 메시지
  LIST = 'list', // 메시지 목록
}

export interface BaseMessage {
  chat_room_id: number;
  id: number;
}

export interface BaseChatMessage extends BaseMessage {
  sender_id: number | null;
  sent_at: string;
}

export interface NormalChatMessage extends BaseChatMessage {
  type: WebsocketMessageType.NORMAL;
  message: string;
}

export interface ImageChatMessage extends BaseChatMessage {
  type: WebsocketMessageType.IMAGE;
  url: string;
}

export type ChatMessage = NormalChatMessage | ImageChatMessage;

export interface ListMessage extends BaseMessage {
  messages: ChatMessage[];
}
