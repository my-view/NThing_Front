import React from 'react';
import NaverMapView from 'react-native-nmap';
import { CustomMarker } from 'components/nmap/marker';
import { MapModal } from 'components/common/map-modal';
import { RootStackParamList } from 'screens/stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEditUser } from 'hooks/user/user-edit';

type Props = NativeStackScreenProps<RootStackParamList, 'UniversityMapModal'>;

const UniversityMapModal = ({ navigation, route }: Props) => {
  const { college_id, latitude, longitude } = route.params;
  const pin = {
    id: college_id,
    latitude: Number(latitude),
    longitude: Number(longitude),
  };
  const editUserMutation = useEditUser();
  return (
    <MapModal
      onClose={navigation.goBack}
      title='이 위치가 맞나요?'
      subTitle='위치가 맞지 않다면 다시 검색해주세요!'
      onComplete={() => {
        const form = new FormData();
        form.append('college_id', college_id);
        editUserMutation.mutateAsync(form);
        navigation.goBack();
        navigation.navigate('MainScreen', pin);
      }}
      completeText='네, 맞습니다'
    >
      <NaverMapView
        style={{ width: '100%', aspectRatio: '4/3' }}
        showsMyLocationButton={true}
        center={{ ...pin, zoom: 14 }}
      >
        <CustomMarker coordinate={pin} />
      </NaverMapView>
    </MapModal>
  );
};

export default UniversityMapModal;
