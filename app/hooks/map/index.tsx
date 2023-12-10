import { useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getMapTradeInfoAPI } from '~/api/map';
import { mapTradeState, uniqueListState } from '~/state/map-trade-list';
import { useApiError } from '../useApiError';

const defaultCenterPosition = {
  latitude: 37.564362,
  longitude: 126.977011,
  zoom: 16,
  search_keyword: '',
  radius: '',
  sort: '',
};

export function useMapTrade() {
  const { handleError } = useApiError();
  const [tradeList, setTradeList] = useRecoilState(mapTradeState);
  const uniqueTradeList = useRecoilValue(uniqueListState);
  /**
   * 내 위치 보기 기능 추가 시
   */
  const userPosition = {
    latitude: 37.564362,
    longitude: 126.977011,
    zoom: 16,
    search_keyword: '',
    radius: '',
    sort: '',
  };
  const [centerMapInfo, setCenterMapInfo] = useState(
    defaultCenterPosition || userPosition,
  );

  const mapSearch = useQuery(
    ['mapSearch', [centerMapInfo]],
    () => getMapTradeInfoAPI(centerMapInfo),
    {
      onSuccess: (res) => {
        setTradeList(res);
      },

      onError: (err) => {
        handleError(err.code);
      },
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: 0,
    },
  );

  return { centerMapInfo, setCenterMapInfo, tradeList, uniqueTradeList };
}
