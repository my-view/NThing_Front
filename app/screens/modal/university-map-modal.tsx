import React from 'react';
import NaverMapView from 'react-native-nmap';
import { CustomMarker } from 'components/nmap/marker';
import { MapModal } from 'components/common/map-modal';
import { RootStackParamList } from 'screens/stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'UniversityMapModal'>;

const UniversityMapModal = ({ navigation, route }: Props) => {
  const { latitude, longitude } = route.params;
  const pin = { id: 1, latitude, longitude };
  return (
    <MapModal
      onClose={navigation.goBack}
      title='이 위치가 맞나요?'
      subTitle='위치가 맞지 않다면 다시 검색해주세요!'
      onComplete={() => {
        navigation.goBack();
        navigation.navigate('MainScreen');
      }}
      completeText='네, 맞습니다'
    >
      <NaverMapView
        style={{ width: '100%', aspectRatio: '4/3' }}
        showsMyLocationButton={true}
        center={{ ...pin, zoom: 14 }}
        onTouch={() => console.log('onTouch')}
        onMapClick={(e) => console.warn('onMapClick', JSON.stringify(e))}
      >
        <CustomMarker coordinate={pin} />
      </NaverMapView>
    </MapModal>
  );
};

export default UniversityMapModal;
