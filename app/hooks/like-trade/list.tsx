import { useQuery } from '@tanstack/react-query';
import { likeTradeListAPI } from '~/api/like-trade';
import { likeTradeKeys } from '~/key/like-trade';
import { PurchaseDetail } from '~/types/purchase';

export const useLikeTrade = () => {
  const likeTradeList = useQuery({
    queryKey: likeTradeKeys.all,
    queryFn: likeTradeListAPI,
  });

  return { likeTradeList };
};
