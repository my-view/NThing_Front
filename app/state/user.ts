import { atom } from 'recoil';

interface Token {
  access_token: string;
  refresh_token: string;
}
export const DecodeTokenState = atom({
  key: 'userInfo/DecodeTokenState',
  default: !false, // 로그인 상황일때는 true , 아닐때는 false
});

export const TokenState = atom<Token>({
  key: 'userInfo/TokenState',
  default: {
    access_token: '',
    refresh_token: '',
  }, // 로그인 상황일때는 true , 아닐때는 false
});
