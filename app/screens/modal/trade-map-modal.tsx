import React, { useState } from 'react';
import NaverMapView from 'react-native-nmap';
import { CustomMarker } from 'components/nmap/marker';
import { MapModal } from 'components/common/map-modal';
import { Input } from 'components/common/input';
import { theme } from '~/../theme';
import { RoundedButton } from 'components/common/button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'screens/stack';
import { TradePlace } from 'types/common';

type Props = NativeStackScreenProps<RootStackParamList, 'TradeMapModal'>;

const TradeMapModal = ({ navigation, route }: Props) => {
  const { initialPlace, update } = route.params;
  const [place, setPlace] = useState(initialPlace);
  // TODO: 사용자의 학교 데이터 받아와서 좌표 적용
  const initialPin = initialPlace.coord || {
    latitude: 37.564362,
    longitude: 126.977011,
  };

  const updatePlace = (newPlace: TradePlace) => {
    setPlace(newPlace);
    update(newPlace);
  };

  return (
    <MapModal
      onClose={navigation.goBack}
      title='장소를 선택해주세요'
      subTitle='지도를 움직여 거래할 장소를 핀에 맞춰주세요.'
      variant='bottom'
    >
      <NaverMapView
        style={{ width: '100%', aspectRatio: '5/3' }}
        center={{ ...initialPin, zoom: 15 }}
        onCameraChange={(e) =>
          updatePlace({
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
        onChangeText={(text) => updatePlace({ ...place, description: text })}
        placeholder='상세 위치를 입력해주세요. ex) 정문 편의점 앞'
        placeholderTextColor={theme.palette.gray03}
        style={{ marginTop: 30, marginBottom: 10 }}
      />
      <RoundedButton
        title='선택 완료'
        onPress={navigation.goBack}
        style={{ borderRadius: 12 }}
      />
    </MapModal>
  );
};

export default TradeMapModal;
