import { IconName } from 'components/common/icon';
import { chatStatus } from 'components/common/chat-item';

export interface WithIdName {
  id: number;
  name: string;
}

export interface stringType {
  title: string;
}

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
  day: number;
  hour: number;
  minute: number;
  full: string;
}
