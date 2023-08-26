import { atom } from 'recoil';

export const DecodeTokenState = atom({
  key: 'userInfo/DecodeTokenState',
  default: !false, // 로그인 상황일때는 true , 아닐때는 false
});
