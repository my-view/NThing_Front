import { IconName } from 'components/common/icon';
import { Coord } from 'react-native-nmap';
import { AxiosRequestConfig, AxiosResponseHeaders } from 'axios';

export interface AxiosResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: AxiosResponseHeaders;
  config: AxiosRequestConfig<D>;
  request?: any;
}

export interface Envelope<T> {
  data: T;
  status: string;
  message: string;
}

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
  is_liked: boolean;
  id: number;
  latitude: number;
  longitude: number;
  status: boolean;
  image: string | null;
}

export type MenuListType = {
  id: number;
  title: string;
  icon: IconName;
  navigate: string;
};

export interface TradePlace {
  coord: Coord;
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

export interface TradeParams extends Coord {
  zoom: number;
  search_keyword?: string;
  radius: number;
  sort?: string;
}

export interface CategoryItem extends WithIdName {
  image: string;
}
