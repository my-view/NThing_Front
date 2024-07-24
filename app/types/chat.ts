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
  NORMAL = 'TEXT',
  IMAGE = 'IMAGE',
  EXPEL = 'EXPEL', // 강퇴 발생 시 메시지
  COMPLETE = 'COMPLETE', // 거래 종료 시 메시지
  SATISFY = 'SATISFACTION', // 만족/불만족 메시지
  LIST = 'LIST', // 메시지 목록
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
  content: string;
}

export interface ImageChatMessage extends BaseChatMessage {
  type: WebsocketMessageType.IMAGE;
  url: string;
}

export interface CompleteChatMessage extends BaseChatMessage {
  type: WebsocketMessageType.COMPLETE;
}

export interface CompleteChatMessage extends BaseChatMessage {
  type: WebsocketMessageType.COMPLETE;
}

export type ChatMessage =
  | NormalChatMessage
  | ImageChatMessage
  | CompleteChatMessage;

// user 한테만
export interface ListMessage extends BaseMessage {
  messages: ChatMessage[];
}

export interface ChatRoomListItem {
  id: number;
  purchaseId: number;
  createdAt: string; // '2023-12-12 20:52:13'
  isDeleted: boolean;
  isCompleted: boolean;
}
