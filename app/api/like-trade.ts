import axios from 'axios';
import { PurchaseDetail } from '~/types/purchase';

export const likeTradeListAPI = async () => {
  return await axios.get('/user/like');
};
