import { IconName } from 'components/common/icon';
import { chatStatus } from 'components/common/chat-item';
import { Coord } from 'react-native-nmap';

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
  date: string;
  price: number;
  numerator: number;
  denominator: number;
  liked: boolean;
  id: number;
  latitude: number;
  longitude: number;
  status: boolean;
  image: string | undefined;
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

export interface TradePlace {
  coord?: Coord;
  description: string;
}

export interface TradeDate {
  now: Date;
  day: number;
  hour: number;
  minute: number;
  full: string;
}

export interface Comment {
  id: number;
  content: string;
  nickname: string;
  profile_image: string | null;
  is_private: boolean;
  is_authorized: boolean;
  created_at?: string;
  updated_at: null;
  replies?: Comment[];
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

export interface TradeParams {
  latitude: string | number;
  longitude: string | number;
  zoom: number;
  search_keyword: string;
  radius: number;
  sort: string;
}
