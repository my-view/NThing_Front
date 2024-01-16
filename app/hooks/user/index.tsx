import { useQuery } from 'react-query';
import { getUserInfoAPI } from 'api/user';
import { useApiError } from 'hooks/useApiError';
import { userInfoType } from 'types/user';
import { useState } from 'react';

export function useUser() {
  const { handleError } = useApiError();
  const [userInfo, setUserInfo] = useState({});

  const result = useQuery(['getUserInfo'], getUserInfoAPI, {
    onSuccess: (res: userInfoType) => {
      console.log('@ getUserInfores', res.data);
      return setUserInfo(res.data);
      // return res;
    },
    onError: (err) => {
      console.log('error', err);
      // handleError(err.code);
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    // cacheTime: 0,
    // retry: 1,
  });

  return { userInfo, result };
}
