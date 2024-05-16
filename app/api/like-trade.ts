import axios from 'axios';

export const likeTradeListAPI = async () => {
  return await axios.get('/user/like');
};
