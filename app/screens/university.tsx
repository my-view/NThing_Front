import React, {useState} from 'react';
import {SafeAreaView, Text, useWindowDimensions, View} from 'react-native';
import styled from '@emotion/native';
import {Input} from '../components/common/input';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const getHeightRatio = (height: number) =>
  Math.floor((height / 812) * 100) + '%';

const UniversityScreen = () => {
  const {width, height} = useWindowDimensions();
  const [university, setUniversity] = useState('');
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  return (
    <SafeAreaView>
      <Container>
        <MainText>{`학교를\n선택해 주세요`}</MainText>
        <Input
          value={university}
          onChangeText={text => setUniversity(text)}
          placeholder="학교명을 검색하세요"
          // autoFocus
        />
        <View style={{height: width - 40}}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex: 1}}
            region={region}
            onRegionChange={setRegion}
          />
        </View>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled(View)`
  padding: ${getHeightRatio(136)} 20px;
  height: 100%;
`;

const MainText = styled(Text)`
  margin-bottom: 30px;
  color: black;
  font-size: 28px;
  font-weight: 600;
  line-height: 38px;
`;

export default UniversityScreen;
