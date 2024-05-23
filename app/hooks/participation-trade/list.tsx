import { useQuery } from '@tanstack/react-query';
import { participationTradeListAPI } from '~/api/purchased-trade';
import { participationTradeKeys } from '~/key/participation-trade';

export const useParticipationTrade = () => {
  const participationTradeList = useQuery({
    queryKey: participationTradeKeys.all,
    queryFn: participationTradeListAPI,
  });

  return { participationTradeList };
};
