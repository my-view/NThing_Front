import { atom } from 'recoil';

type appStateType = '' | 'active' | 'inactive' | 'background';

export const userAppState = atom<appStateType>({
  key: 'app/userAppState',
  default: '', // 로그인 상황일때는 true , 아닐때는 false
});