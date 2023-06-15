import React from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from 'react-native';
import styled from '@emotion/native';
import {Font16W500, UnderLine14} from '../components/common/text';
import {getWidthRatio, getHeightRatio} from '../assets/util/layout';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';

const HomeScreen = ({navigation}: any) => {
  const {width, height} = useWindowDimensions();
  const P0 = {latitude: 37.564362, longitude: 126.977011};
  const P1 = {latitude: 37.565051, longitude: 126.978567};
  const P2 = {latitude: 37.565383, longitude: 126.976292};

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Container>
        <View
          style={{
            height: 56,
            backgroundColor: 'red',
          }}>
          <Text>dfsdfsdf</Text>
        </View>
        <View
          style={{
            height: '100%',
          }}>
          <NaverMapView
            style={{width: '100%', height: '100%'}}
            showsMyLocationButton={false}
            zoomControl={false}
            center={{...P0, zoom: 16}}
            onTouch={() => console.log('onTouch')}
            onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
            <Marker
              coordinate={P0}
              onClick={() => console.warn('onClick! p0')}
            />
            <Marker
              coordinate={P1}
              pinColor="blue"
              onClick={() => console.warn('onClick! p1')}
            />
            <Marker
              coordinate={P2}
              pinColor="red"
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
        </View>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled(View)`
  background-color: #000;
`;

const SocialLoginWrap = styled(View)`
  align-items: center;
`;

const SocialSubTitle = styled(Font16W500)`
  margin-bottom: 30px;
  // font-family: ${props => props.theme.font[500]};
  // color: ${props => props.theme.palette.primary};
`;
const LaterLogin = styled(UnderLine14)`
  margin-top: 20px;
`;

const ButtonWrap = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 22px;
`;

export default HomeScreen;
