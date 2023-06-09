import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import NaverMapView from 'react-native-nmap';
import Close from 'assets/image/Close.svg';
import styled from '@emotion/native';
import { getWidthRatio } from 'assets/util/layout';
import { Font18W600 } from 'components/common/text';
import { theme } from '~/../theme';
import { CustomMarker } from 'components/nmap/marker';

const UniversityMapModal = ({ navigation }) => {
  const P0 = { id: 1, latitude: 37.564362, longitude: 126.977011 };
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
            <Close width={16} height={16} fill={'#000'} />
          </TouchableOpacity>
        </ModalHeader>
        <NaverMapView
          style={{ width: '100%', aspectRatio: '4/3' }}
          showsMyLocationButton={true}
          center={{ ...P0, zoom: 14 }}
          onTouch={() => console.log('onTouch')}
          onMapClick={(e) => console.warn('onMapClick', JSON.stringify(e))}
        >
          <CustomMarker coordinate={P0} />
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
