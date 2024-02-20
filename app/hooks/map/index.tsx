import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMapTradeInfoAPI } from '~/api/map';
import { tradeQueryKeys } from '../../key/map';
import { TradeParams } from '~/types/common';
import { defaultCenterPosition, userPosition } from '~/assets/mock/pins';
import { PurchaseItemType } from 'types/common';

// STEP2: API 캐싱
export function UsefetchMapTrade(centerMapInfo: TradeParams) {
  return useQuery({
    queryKey: tradeQueryKeys.list(centerMapInfo),
    queryFn: () => getMapTradeInfoAPI(centerMapInfo),
    // ...etc,
  });
}

// STEP3: 페이지 훅
export function useMapTrade() {
  const [centerMapInfo, setCenterMapInfo] = useState(
    defaultCenterPosition || userPosition,
  );
  const {
    data: tradeList,
    isSuccess,
    isError,
  } = UsefetchMapTrade(centerMapInfo);
  const [isFirstLanding, setIsFirstLanding] = useState(true);

  return { centerMapInfo, setCenterMapInfo, tradeList, isFirstLanding };
}
