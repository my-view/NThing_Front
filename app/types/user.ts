import { WithIdName } from 'types/common';

type collegeType = {
  address: string;
  name: string;
  id: number;
  latitude: string;
  longitude: string;
};

export interface userInfoType {
  id: number;
  nickname: string;
  email: string;
  profile_image: string;
  credit: number;
  subscription_date: string;
  college: collegeType;
  provider_id: string;
  provider: 'google' | 'kakao' | 'naver';
}

export const APP_STATE = {
  active: 'active', // 앱 안에서 사용중인 경우
  inactive: 'inactive', // [IOS] 앱 안에서 벗어난 경우
  background: 'background', // 앱 안에서 다른곳으로 벗어난 경우
} as const;

export const TOKEN_ERROR_STATUS = {
  ACCESS_TOKEN_EXPIRED: 'ACCESS_TOKEN_EXPIRED',
  REFRESH_TOKEN_EXPIRED: 'REFRESH_TOKEN_EXPIRED',
} as const;
