import { useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getMapTradeInfoAPI } from '~/api/map';
import { mapTradeState } from '~/state/map-trade-list';
import { useApiError } from '../useApiError';

// radius 삭제, zoom으로
const defaultCenterPosition = {
  latitude: 37.56363901004543,
  longitude: 126.93927584825141,
  zoom: 16,
  search_keyword: '',
  radius: 100000000,
  sort: '',
};

export function useMapTrade() {
  const { handleError } = useApiError();
  const [tradeList, setTradeList] = useRecoilState(mapTradeState);
  /**
   * 내 위치 보기 기능 추가 시
   */
  const userPosition = {
    latitude: 37.56363901004543,
    longitude: 126.93927584825141,
    zoom: 16,
    search_keyword: '',
    radius: 100000000,
    sort: '',
  };
  const [centerMapInfo, setCenterMapInfo] = useState(
    defaultCenterPosition || userPosition,
  );

  const [isFirstLanding, setIsFirstLanding] = useState(true);

  const mapSearch = useQuery(
    ['mapSearch', [centerMapInfo]],
    () => getMapTradeInfoAPI(centerMapInfo),
    {
      onSuccess: (res) => {
        console.log('@@ tradeList', res);
        setTradeList(res);
      },

      onError: (err) => {
        handleError(err.code);
      },
      refetchOnWindowFocus: false,
    },
  );

  return { centerMapInfo, setCenterMapInfo, tradeList, isFirstLanding };
}
