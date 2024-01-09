import axios from 'axios';
import { PurchaseDetail } from '~/types/purchase';

interface Envelope<T> {
  data: T;
  status: string;
  msg: string;
}

export const getPurchaseDetailAPI = async (id?: number) => {
  if (!id) return null;
  return axios.get<Envelope<PurchaseDetail>>(`/purchase/${id}`);
};

export const postPurchaseLikedAPI = async (id: number) => {
  if (!id) return null;

  return await axios.post(`purchase/${id}/like`);
};
