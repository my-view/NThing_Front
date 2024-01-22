import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMapTradeInfoAPI } from '~/api/map';
import { tradeQueryKeys } from './key';
import { TradeParams } from '~/types/common';
import { defaultCenterPosition, userPosition } from '~/assets/mock/pins';

export function UsefetchMapTrade(centerMapInfo: TradeParams) {
  return useQuery({
    queryKey: tradeQueryKeys.list(centerMapInfo),
    queryFn: () => getMapTradeInfoAPI(centerMapInfo),
    // ...etc,
  });
}

export function useMapTrade() {
  const [centerMapInfo, setCenterMapInfo] = useState(
    defaultCenterPosition || userPosition,
  );
  const tradeList = UsefetchMapTrade(centerMapInfo);

  const [isFirstLanding, setIsFirstLanding] = useState(true);

  return { centerMapInfo, setCenterMapInfo, tradeList, isFirstLanding };
}
