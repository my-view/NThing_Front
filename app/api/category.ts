import axios from 'axios';

export const getCategoryListAPI = async () => {
  return axios.get('/categories');
};

