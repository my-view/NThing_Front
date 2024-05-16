import axios from 'axios';

export const myOpenTradeListAPI = async () => {
  return await axios.get('/purchases/manager');
};
