import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMapTradeInfoAPI } from '~/api/map';
import { tradeQueryKeys } from '../../key/map';
import { TradeParams } from '~/types/common';
import { Coord } from 'react-native-nmap';
import { defaultCenterPosition } from 'assets/mock/pins';

// STEP2: API 캐싱
function useFetchMapTrade(centerMapInfo: TradeParams) {
  return useQuery({
    queryKey: tradeQueryKeys.list(centerMapInfo),
    queryFn: () => getMapTradeInfoAPI(centerMapInfo),
    refetchOnWindowFocus: true,
    // ...etc,
  });
}

// STEP3: 페이지 훅
export function useMapTrade(coord: Coord) {
  const defaultMapCenter = { ...defaultCenterPosition, ...coord };
  const [centerMapInfo, setCenterMapInfo] = useState(defaultMapCenter);

  const [isFirstLanding, setIsFirstLanding] = useState(true);
  const {
    data: tradeList,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useFetchMapTrade(centerMapInfo);

  useEffect(() => {
    setTimeout(() => setIsFirstLanding(false), 1000);
  }, []);

  return {
    defaultMapCenter,
    centerMapInfo,
    setCenterMapInfo,
    tradeList,
    isFirstLanding,
    isLoading,
    refetch,
  };
}
