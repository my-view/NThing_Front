import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import styled from '@emotion/native';
import { Font16W500, UnderLine14 } from 'components/common/text';
import NaverMapView, { Marker } from 'react-native-nmap';

const HomeScreen = ({ navigation }) => {
  const P0 = { latitude: 37.564362, longitude: 126.977011 };
  const P1 = { latitude: 37.565051, longitude: 126.978567 };
  const P2 = { latitude: 37.565383, longitude: 126.976292 };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Container>
        <View
          style={{
            height: 56,
            backgroundColor: 'red',
          }}
        >
          <Text>dfsdfsdf</Text>
        </View>
        <View style={{ height: '100%' }}>
          <NaverMapView
            style={{ width: '100%', height: '100%' }}
            showsMyLocationButton={false}
            zoomControl={false}
            center={{ ...P0, zoom: 16 }}
            onTouch={() => console.log('onTouch')}
            onMapClick={(e) => console.warn('onMapClick', JSON.stringify(e))}
          >
            <Marker
              coordinate={P0}
              onClick={() => console.warn('onClick! p0')}
            />
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
          </NaverMapView>
        </View>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled(View)`
  background-color: #000;
`;

export default HomeScreen;
