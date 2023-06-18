import React, { useState } from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import styled from '@emotion/native';
import { Font16W500, UnderLine14 } from 'components/common/text';
import NaverMapView from 'react-native-nmap';
import { CustomMarker } from 'components/nmap/marker';

const HomeScreen = ({ navigation }) => {
  const [selectedPin, setSelectedPin] = useState<number>();
  const PIN_DATA = [
    { id: 1, latitude: 37.564362, longitude: 126.977011 },
    { id: 2, latitude: 37.565051, longitude: 126.978567 },
    { id: 3, latitude: 37.565383, longitude: 126.976292 },
  ];

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
            center={{ ...PIN_DATA[selectedPin || 0], zoom: 16 }}
            onTouch={() => console.log('onTouch')}
            onMapClick={(e) => console.warn('onMapClick', JSON.stringify(e))}
          >
            {PIN_DATA.map((pin, index) => (
              <CustomMarker
                key={pin.id}
                coordinate={pin}
                onClick={() => {
                  setSelectedPin(index);
                  console.warn(`onClick!${pin.id}`);
                }}
                isSelected={index === selectedPin}
              />
            ))}
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
