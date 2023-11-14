import axios from 'axios';
import { TOKEN_STORAGE_KEY } from 'assets/util/constants';
import { getStorage } from 'assets/util/storage';

export const getUserInfoAPI = async () => {
  const token = await getStorage(TOKEN_STORAGE_KEY);
  console.log('token', token);
  return axios.get('/user', { headers: { Authorization: `Bearer ${token}` } });
};
