import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePurchaseJoinAPI } from 'api/purchase';
import { purchaseQueryKeys } from 'key/purchase';
import { PurchaseDetail } from 'types/purchase';

export const useCancelPurchaseJoin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: purchaseQueryKeys.join(),
    mutationFn: (purchaseId: number) => deletePurchaseJoinAPI(purchaseId),
    onSuccess(_, purchaseId) {
      const queryKey = purchaseQueryKeys.detail(purchaseId);
      queryClient.setQueryData<PurchaseDetail>(
        queryKey,
        (oldData) =>
          ({
            ...oldData,
            numerator: (oldData?.numerator || 0) - 1,
            is_joined: false,
          } as PurchaseDetail),
      );
    },
  });
};
