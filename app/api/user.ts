import axios from 'axios';

export const getUserInfoAPI = async () => {
  return axios.get('/user');
};
