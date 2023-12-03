import axios from 'axios';
import { PurchaseDetail } from '~/types/purchase';

export const getPurchaseDetailAPI = async (id: number) => {
  return axios.get<PurchaseDetail>(`/purchase/${id}}`);
};
