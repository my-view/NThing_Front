import { useQuery } from 'react-query';
import { useApiError } from 'hooks/useApiError';
import { getPurchaseCommentAPI } from 'api/purchase';

export const usePurchaseComments = (id?: number) => {
  const { handleError } = useApiError();

  const result = useQuery(
    ['getPurchaseComments'],
    () => getPurchaseCommentAPI(id),
    {
      onSuccess: (res) => {
        console.log('@ getPurchaseComments res', res);
        return res;
      },
      onError: (err) => {
        console.log('purchase comments error', err);
        // handleError(err.code);
      },
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: 0,
    },
  );

  return result;
};
