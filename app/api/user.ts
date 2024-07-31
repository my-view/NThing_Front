import axios from 'axios';
import { userInfoType } from '~/types/user';

export const getUserInfoAPI = async (token) => {
  console.log('@@ getUserInfoAPI token', token);
  return await axios.get('/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchUserInfoAPI = (form: FormData) =>
  axios.patch<userInfoType>('/user', form);
