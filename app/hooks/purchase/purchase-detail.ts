import { useQuery } from 'react-query';
import { useApiError } from 'hooks/useApiError';
import { getPurchaseDetailAPI } from '~/api/purchase';

export const usePurchaseDetail = (id: number) => {
  const { handleError } = useApiError();

  const result = useQuery(
    ['getPurchaseDetail'],
    () => getPurchaseDetailAPI(id),
    {
      onSuccess: (res) => {
        console.log('@ getPurchaseDetail res', res);
        return res;
      },
      onError: (err) => {
        console.log('error', err);
        // handleError(err.code);
      },
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: 0,
    },
  );

  return result;
};
