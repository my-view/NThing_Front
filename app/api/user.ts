import axios from 'axios';

export const getUserInfoAPI = async () => {
  return await axios.get('/user');
};
