import React, { useState } from 'react';
import NaverMapView from 'react-native-nmap';
import { CustomMarker } from 'components/nmap/marker';
import { MapModal } from 'components/common/map-modal';
import { Input } from 'components/common/input';
import { theme } from '~/../theme';

const TradeMapModal = ({ navigation, route }) => {
  const { place, updatePlace } = route.params;
  // TODO: 사용자의 학교 데이터 받아와서 좌표 적용
  const initialPin = place.coord || {
    latitude: 37.564362,
    longitude: 126.977011,
  };
  const [pin, setPin] = useState(initialPin);
  const [description, setDescription] = useState(place.description);
  return (
    <MapModal
      onClose={navigation.goBack}
      title='장소를 선택해주세요'
      subTitle='지도를 움직여 거래할 장소를 핀에 맞춰주세요.'
      onComplete={() => {
        navigation.goBack();
        updatePlace({ coord: pin, description });
      }}
      completeText='선택 완료'
    >
      <NaverMapView
        style={{ width: '100%', aspectRatio: '4/3' }}
        center={{ ...initialPin, zoom: 15 }}
        onCameraChange={(e) =>
          setPin({
            latitude:
              (e.contentRegion[0].latitude + e.contentRegion[1].latitude) / 2,
            longitude:
              (e.contentRegion[0].longitude + e.contentRegion[2].longitude) / 2,
          })
        }
      >
        <CustomMarker coordinate={{ ...pin, id: 1 }} />
      </NaverMapView>
      <Input
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder='상세 위치를 입력해주세요. ex) 정문 편의점 앞'
        placeholderTextColor={theme.palette.gray03}
        style={{ marginTop: 30 }}
      />
    </MapModal>
  );
};

export default TradeMapModal;
