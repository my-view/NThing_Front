import React, { useMemo, useRef } from 'react';
import { Pressable, Text, View, Dimensions } from 'react-native';
import NaverMapView from 'react-native-nmap';
import { CustomMarker } from 'components/nmap/marker';
import BottomSheet from '@gorhom/bottom-sheet';
import { Input } from 'components/common/input';
import { theme } from '~/../theme';
import { TradePlace } from 'types/common';
import { BottomSheetHandleStyle } from 'components/common/bottomSheet-Handle';
import { Font18W600 } from 'components/common/text';
import { Icon } from 'components/common/icon';
import { ModalHeader } from 'components/common/map-modal';
import { Button } from 'components/common/button';

const TradeMapModal: React.FC<{
  place: TradePlace;
  setPlace: (place: TradePlace) => void;
  onClose: () => void;
}> = ({ place, setPlace, onClose }) => {
  const listSheetRef = useRef<BottomSheet>(null);
  const windowHeight = Dimensions.get('window').height;
  const headerFullHeight = windowHeight - 76;
  const ListPoints = useMemo(
    () => ['1%', '24%', '37%', '50%', headerFullHeight],
    [headerFullHeight],
  );

  // TODO: 사용자의 학교 데이터 받아와서 좌표 적용
  const initialPin = place.coord || {
    latitude: 37.564362,
    longitude: 126.977011,
  };
  return (
    <BottomSheet
      ref={listSheetRef}
      snapPoints={ListPoints}
      index={4}
      handleIndicatorStyle={BottomSheetHandleStyle}
    >
      <ModalHeader>
        <View style={{ gap: 10 }}>
          <Font18W600>장소를 선택해주세요</Font18W600>
          <Text style={{ fontSize: 13, color: theme.palette.primary }}>
            지도를 움직여 거래할 장소를 핀에 맞춰주세요.
          </Text>
        </View>
        {onClose && (
          <Pressable onPress={onClose}>
            <Icon name={'S_Close'} size={16} color={theme.palette.black} />
          </Pressable>
        )}
      </ModalHeader>
      <NaverMapView
        style={{ width: '100%', aspectRatio: '4/3' }}
        center={{ ...initialPin, zoom: 15 }}
        onCameraChange={(e) =>
          setPlace({
            description: place.description,
            coord: {
              latitude:
                (e.contentRegion[0].latitude + e.contentRegion[1].latitude) / 2,
              longitude:
                (e.contentRegion[0].longitude + e.contentRegion[2].longitude) /
                2,
            },
          })
        }
      >
        <CustomMarker coordinate={{ ...place.coord, id: 1 }} />
      </NaverMapView>
      <Input
        value={place.description}
        onChangeText={(text) => setPlace({ ...place, description: text })}
        placeholder='상세 위치를 입력해주세요. ex) 정문 편의점 앞'
        placeholderTextColor={theme.palette.gray03}
        style={{ marginTop: 30 }}
      />
      <Button onPress={() => {}}>선택 완료</Button>
    </BottomSheet>
  );
};

export default TradeMapModal;
