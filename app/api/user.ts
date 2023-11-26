import axios from 'axios';
import { TOKEN_STORAGE_KEY } from 'assets/util/constants';
import { getStorage } from 'assets/util/storage';

export const getUserInfoAPI = async () => {
  return await axios.get('/user');
};
