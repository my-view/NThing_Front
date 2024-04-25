import { WithIdName } from 'types/common';

export interface userInfoType {
  id: number;
  nickname: string;
  email: string;
  profile_image: string;
  credit: number;
  subscription_date: string;
  college: WithIdName;
  provider_id: string;
  provider: 'google' | 'kakao' | 'naver';
}

export const enum APP_STATE {
  active = 'active', // 앱 안에서 사용중인 경우
  inactive = 'inactive', // [IOS] 앱 안에서 벗어난 경우
  background = 'background', // 앱 안에서 다른곳으로 벗어난 경우
}
