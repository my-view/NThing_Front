import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { postPurchaseJoinAPI } from 'api/purchase';
import { purchaseQueryKeys } from '~/key/purchase';
import { PurchaseDetail } from '~/types/purchase';

export const useJoinPurchase = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: purchaseQueryKeys.join(),
    mutationFn: (purchaseId: number) => postPurchaseJoinAPI(purchaseId),
    onSuccess(_, purchaseId) {
      const queryKey = purchaseQueryKeys.detail(purchaseId);
      queryClient.setQueryData<PurchaseDetail>(
        queryKey,
        (oldData) =>
          ({
            ...oldData,
            numerator: (oldData?.numerator || 0) + 1,
          } as PurchaseDetail),
      );
    },
  });
};
