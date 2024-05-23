import axios from 'axios';
// 구매한 거래(참여한 거래)
export const participationTradeListAPI = async () => {
  return await axios.get('/purchases/user');
};
