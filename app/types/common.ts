import { IconName } from 'components/common/icon';
import { chatStatus } from 'components/common/chat-item';

export interface WithIdName {
  id: number;
  name: string;
}

export interface stringType {
  title: string;
}

export type SocialLoginRoute = 'google' | 'kakao' | 'naver';

export interface Coordinate {
  id: number;
  latitude: number;
  longitude: number;
}

export interface College extends Coordinate {
  name: string;
  address: string;
}

export interface SortType {
  cd: string;
  nm: string;
}

export interface PurchaseItemType {
  title: string;
  place: string;
  time: string;
  price: number;
  n: number;
  person: number;
  isLike: boolean;
}

export type MenuListType = {
  id: number;
  title: string;
  icon: IconName;
  navigate: string;
};

export type ChatListType = {
  id: number;
  title: string;
  last_message: string;
  navigate: string;
  trade_status: keyof typeof chatStatus;
};

export interface TradeDate {
  now: Date;
  day: number;
  hour: number;
  minute: number;
  full: string;
}

export interface BaseComment {
  content: string;
  is_private: boolean;
}

export interface Comment extends BaseComment {
  id: number;
  nickname: string;
  img: string;
  created_at?: string;
  updated_at: null;
  // level: 0;
  // user_id: number;
  // purchase_id: number;
  parent_id: number; // 0이면 부모 없음
  replies: Comment[];
  is_deleted: boolean;
}

export interface ChatUser {
  _id?: string | number;
  name?: string;
  avatar?: string;
}

export interface IMessage {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user?: ChatUser;
  image?: string;
  video?: string;
  sent?: boolean;
  received?: boolean;
}
