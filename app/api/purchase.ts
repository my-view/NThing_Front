import axios from 'axios';
import { PurchaseDetail } from '~/types/purchase';

export const getPurchaseDetailAPI = async (id?: number) => {
  if (!id) return null;
  return axios.get<PurchaseDetail>(`/purchase/${id}`);
};
