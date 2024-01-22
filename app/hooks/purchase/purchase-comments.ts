import { useQuery } from '@tanstack/react-query';
import { getPurchaseCommentAPI } from 'api/purchase';
import { purchaseQueryKeys } from './key';

export const usePurchaseComments = (id?: number) => {
  //
  const getComment = useQuery({
    queryKey: purchaseQueryKeys.comment(id),
    queryFn: () => getPurchaseCommentAPI(id),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return getComment;
};
