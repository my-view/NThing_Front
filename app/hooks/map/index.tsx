import { useEffect, useState } from 'react';
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
    refetchOnWindowFocus: true,
    // ...etc,
  });
}

// STEP3: 페이지 훅
export function useMapTrade() {
  const [centerMapInfo, setCenterMapInfo] = useState(
    defaultCenterPosition || userPosition,
  );
  const [isFirstLanding, setIsFirstLanding] = useState(true);

  const [mapCenter, setMapCenter] = useState(
    defaultCenterPosition || userPosition,
  );
  const {
    data: tradeList,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = UsefetchMapTrade(centerMapInfo);

  useEffect(() => {
    setTimeout(() => {
      setIsFirstLanding(false);
    }, 100);
  }, []);

  return {
    centerMapInfo,
    setCenterMapInfo,
    tradeList,
    isFirstLanding,
    mapCenter,
    setMapCenter,
    isLoading,
    refetch,
  };
}
