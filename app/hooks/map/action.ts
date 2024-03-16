import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useMemo, useRef, useState } from 'react';
import { Pressable, SafeAreaView, View, Dimensions, Alert } from 'react-native';
import { PurchaseItemType } from '~/types/common';

const listPointValues = {
  1: '1%',
  2: '24%',
  3: '37%',
  4: '50%',
};

export const useMapControl = () => {
  const mapRef = useRef(null);
  const windowHeight = Dimensions.get('window').height;
  const headerFullHeight = windowHeight - 76;
  const [selectedPin, setSelectedPin] = useState<number>(); // 핀 목록이 담긴 array에서 선택된 핀의 index

  /**
   * 1%(i=0) : 안보임
   * 24%(i=1) : 1개 보임
   * 37%(i=2) : 2개 보임
   * 50%(i=3) : 바텀시트 절반
   * headerFullHeight(i=4) : 바텀시트 전체 화면
   */
  const ListPoints = useMemo(
    () => [
      listPointValues[1],
      listPointValues[2],
      listPointValues[3],
      listPointValues[4],
      headerFullHeight,
    ],
    [headerFullHeight],
  );

  const listSheetRef = useRef<BottomSheet>(null);

  /**
   * 마커 선택함수
   * 마커를 선택하면 마커의 위경도를 중심으로 맵이 이동하고 바텀시트가 index 2 상태로 변경된다.
   */
  const selectMarker = (index: number, pin: PurchaseItemType) => {
    setSelectedPin(index);
    mapRef?.current.animateToCoordinate({
      latitude: pin.latitude,
      longitude: pin.longitude,
    });
    listSheetRef.current?.snapToIndex(2);
  };

  return {
    mapRef,
    listSheetRef,
    ListPoints,
    selectMarker,
    selectedPin,
  };
};
