import { useQuery } from '@tanstack/react-query';
import { myOpenTradeListAPI } from '~/api/open-trade';
import { openTradeKeys } from '~/key/open-trade';

export const useOpenTrade = () => {
  const openTradeList = useQuery({
    queryKey: openTradeKeys.all,
    queryFn: myOpenTradeListAPI,
  });

  return { openTradeList };
};
