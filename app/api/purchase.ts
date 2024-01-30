import axios from 'axios';
import { Comment, Envelope } from 'types/common';
import { PurchaseDetail } from 'types/purchase';

export const getPurchaseDetailAPI = async (id?: number) => {
  if (!id) return null;
  return axios.get<Envelope<PurchaseDetail>>(`/purchase/${id}`);
};

export const postPurchaseLikedAPI = async (id: number) => {
  if (!id) return null;
  return await axios.post(`purchase/${id}/like`);
};

export const getPurchaseCommentAPI = async (id?: number) => {
  if (!id) return null;
  return axios.get<Envelope<Comment[]>>(`/purchase/${id}/comments`);
};
