import { useMutation } from 'react-query';
import { useApiError } from 'hooks/useApiError';
import { postPurchaseLikedAPI } from '~/api/purchase';

export const useLike = (purchase_id: number) => {
  const { handleError } = useApiError();

  const changeLikeStatus = useMutation(
    async () => {
      const result = await postPurchaseLikedAPI(purchase_id);
      return result;
    },
    {
      onSuccess: (res) => {
        // setShipList(res.data.message);
        // 성공하면 목록의 데이터를 갱신시켜야하나?
      },
      onError: (error: any) => {
        handleError(error);
      },
    },
  );

  return { changeLikeStatus };
};
