import axios from 'axios';

export const getUserInfoAPI = async () => {
  console.log('## 동작?');
  return await axios.get('/user');
};
