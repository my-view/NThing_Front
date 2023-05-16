import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import styled from '@emotion/native';
import {Input} from '../components/common/input';
import {KakaoMapView} from '@jiggag/react-native-kakao-maps';

const getHeightRatio = (height: number) =>
  Math.floor((height / 812) * 100) + '%';

const UniversityScreen = () => {
  const [university, setUniversity] = useState('');
  return (
    <SafeAreaView>
      <Container>
        <MainText>{`학교를\n선택해 주세요`}</MainText>
        <Input
          value={university}
          onChangeText={text => setUniversity(text)}
          placeholder="학교명을 검색하세요"
          autoFocus
        />
        <KakaoMapView
          markerList={[
            {
              lat: 37.59523,
              lng: 127.086,
              markerName: 'marker',
            },
            {
              lat: 37.59523,
              lng: 127.08705,
              markerName: 'marker2',
            },
          ]}
          width={300}
          height={500}
          centerPoint={{
            lat: 37.59523,
            lng: 127.086,
          }}
          onChange={() => {}}
        />
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
