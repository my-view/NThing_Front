import axios from 'axios';
import { userInfoType } from '~/types/user';

export const getUserInfoAPI = async () => {
  return await axios.get('/user');
};

export const patchUserInfoAPI = (form: FormData) =>
  axios.patch<userInfoType>('/user', form);
