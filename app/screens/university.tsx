import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import styled from '@emotion/native';
import { Input } from 'components/common/input';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';

const getHeightRatio = (height: number) =>
  Math.floor((height / 812) * 100) + '%';

const UniversityScreen = () => {
  const [university, setUniversity] = useState('');
  const P0 = { latitude: 37.564362, longitude: 126.977011 };
  const P1 = { latitude: 37.565051, longitude: 126.978567 };
  const P2 = { latitude: 37.565383, longitude: 126.976292 };
  return (
    <SafeAreaView>
      <Container>
        <MainText>{`학교를\n선택해 주세요`}</MainText>
        <Input
          value={university}
          onChangeText={(text) => setUniversity(text)}
          placeholder='학교명을 검색하세요'
          autoFocus
        />
        <NaverMapView
          style={{ width: '100%', height: '60%' }}
          showsMyLocationButton={true}
          center={{ ...P0, zoom: 16 }}
          onTouch={() => console.log('onTouch')}
          onMapClick={(e) => console.warn('onMapClick', JSON.stringify(e))}
        >
          <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} />
          <Marker
            coordinate={P1}
            pinColor='blue'
            onClick={() => console.warn('onClick! p1')}
          />
          <Marker
            coordinate={P2}
            pinColor='red'
            onClick={() => console.warn('onClick! p2')}
          />
          <Path
            coordinates={[P0, P1]}
            onClick={() => console.warn('onClick! path')}
            width={10}
          />
          <Polyline
            coordinates={[P1, P2]}
            onClick={() => console.warn('onClick! polyline')}
          />
          <Circle
            coordinate={P0}
            color={'rgba(255,0,0,0.3)'}
            radius={200}
            onClick={() => console.warn('onClick! circle')}
          />
          <Polygon
            coordinates={[P0, P1, P2]}
            color={`rgba(0, 0, 0, 0.5)`}
            onClick={() => console.warn('onClick! polygon')}
          />
        </NaverMapView>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled(View)`
  padding: ${getHeightRatio(136)} 20px;
`;

const MainText = styled(Text)`
  margin-bottom: 30px;
  color: black;
  font-size: 28px;
  font-weight: 600;
  line-height: 38px;
`;

export default UniversityScreen;
