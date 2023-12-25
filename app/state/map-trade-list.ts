import { atom } from 'recoil';
import { PurchaseItemType } from '~/types/common';

export const mapTradeState = atom<PurchaseItemType[] | null>({
  key: 'map/mapTradeState',
  default: null, // 로그인 상황일때는 true , 아닐때는 false
});
