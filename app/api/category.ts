import axios from 'axios';

export const getCategoryListAPI = async () => {
  return await axios.get('/categories').then((res) => {
    return res.data;
  });
};
