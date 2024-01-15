import axios from 'axios';

export const getMapTradeInfoAPI = async (params: any) => {
  return await axios.get('/purchases', { params }).then((res) => {
    return res.data.data;
  });
};
