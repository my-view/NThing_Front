import axios from 'axios';
import { PurchaseItemType } from 'types/common';

// TODO: res 타입 이상함
export const getMapTradeInfoAPI = async (params: any) => {
  return await axios.get<PurchaseItemType[]>('/purchases', { params });
};
