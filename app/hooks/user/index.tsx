import { useState } from 'react';
import { useQuery } from 'react-query';
import { getUserInfoAPI } from '~/api/user';
import { useApiError } from '../useApiError';

export function useUser() {
  const { handleError } = useApiError();
  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = useQuery(['getUserInfo'], getUserInfoAPI, {
    onSuccess: (res) => {
      setUserInfo(res);
    },

    onError: (err) => {
      handleError(err.code);
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: 0,
  });

  return userInfo;
}
