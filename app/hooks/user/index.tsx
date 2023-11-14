import { useQuery } from 'react-query';
import { getUserInfoAPI } from 'api/user';
import { useApiError } from 'hooks/useApiError';
import { userInfoType } from 'types/user';

export function useUser() {
  const { handleError } = useApiError();

  const result = useQuery(['getUserInfo'], getUserInfoAPI, {
    onSuccess: (res: userInfoType) => {
      console.log(res);
    },
    onError: (err) => {
      console.log('error', err);
      // handleError(err.code);
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: 0,
  });

  return result;
}
