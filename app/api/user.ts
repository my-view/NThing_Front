import { getRequest } from '~/api/fetcher';
import { userInfoType } from '~/types/user';

export const getUserInfoAPI = () => {
  return getRequest<userInfoType>('/user');
};
