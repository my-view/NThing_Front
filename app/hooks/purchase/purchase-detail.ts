import { useQuery } from '@tanstack/react-query';
import { getPurchaseDetailAPI } from '~/api/purchase';
import { purchaseQueryKeys } from './key';

export const usePurchaseDetail = (id?: number) => {
  //
  const getPurchaseDetail = useQuery({
    queryKey: purchaseQueryKeys.detail(id),
    queryFn: () => getPurchaseDetailAPI(id),
    refetchOnWindowFocus: false,
  });

  return getPurchaseDetail;
};
