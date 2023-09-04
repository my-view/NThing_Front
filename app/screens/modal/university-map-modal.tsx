import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import NaverMapView from 'react-native-nmap';
import Close from 'assets/image/Close.svg';
import styled from '@emotion/native';
import { getWidthRatio } from 'assets/util/layout';
import { Font18W600 } from 'components/common/text';
import { theme } from '~/../theme';
import { CustomMarker } from 'components/nmap/marker';
import { Icon } from '~/components/common/button';

const UniversityMapModal = ({ navigation, route }) => {
  const { latitude, longitude } = route.params;
  const pin = { id: 1, latitude, longitude };
  return (
    <ModalBackground>
      <ModalContent>
        <ModalHeader>
          <View style={{ gap: 10 }}>
            <Font18W600>이 위치가 맞나요?</Font18W600>
            <Text style={{ fontSize: 13, color: theme.palette.primary }}>
              위치가 맞지 않다면 다시 검색해주세요!
            </Text>
          </View>
          <TouchableOpacity onPress={navigation.goBack}>
            <Icon name={'S_Close'} size={16} color={theme.palette.black} />
          </TouchableOpacity>
        </ModalHeader>
        <NaverMapView
          style={{ width: '100%', aspectRatio: '4/3' }}
          showsMyLocationButton={true}
          center={{ ...pin, zoom: 14 }}
          onTouch={() => console.log('onTouch')}
          onMapClick={(e) => console.warn('onMapClick', JSON.stringify(e))}
        >
          <CustomMarker coordinate={pin} />
        </NaverMapView>
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => {
            navigation.goBack();
            navigation.navigate('MainScreen');
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: '600',
              color: theme.palette.primary,
              textAlign: 'center',
            }}
          >
            네, 맞습니다
          </Text>
        </TouchableOpacity>
      </ModalContent>
    </ModalBackground>
  );
};

const ModalBackground = styled.View`
  flex: 1;
  padding-horizontal: ${getWidthRatio(40)};
`;

const ModalContent = styled.View`
  margin: auto 0;
  padding: 20px;
  background-color: ${(p) => p.theme.palette.white};
  border-radius: 10px;
`;

const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 26px;
`;

export default UniversityMapModal;
