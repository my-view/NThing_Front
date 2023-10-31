export interface userInfoType {
  id: number;
  nickname: string;
  email: string;
  profile_image: string;
  credit: number;
  subscription_date: string;
  college_id: number;
  provider_id: string;
  provider: 'google' | 'kakao' | 'naver';
}
