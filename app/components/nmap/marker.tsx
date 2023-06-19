import React from 'react';
import { Marker } from 'react-native-nmap';
import { Image, Platform, View } from 'react-native';
import { Coordinate } from 'types/common';

export const CustomMarker: React.FC<{
  coordinate: Coordinate;
  isSelected?: boolean;
  onClick?: () => void;
}> = ({ coordinate, isSelected, onClick }) => {
  const SIZE = isSelected ? 50 : 34;
  return Platform.OS === 'ios' ? (
    <Marker
      image={require('../../assets/image/map-marker.png')}
      width={SIZE}
      height={SIZE}
      coordinate={coordinate}
      onClick={onClick}
    />
  ) : (
    <Marker
      width={SIZE}
      height={SIZE}
      coordinate={coordinate}
      onClick={onClick}
    >
      <View style={{ position: 'relative' }}>
        <Image
          source={require('../../assets/image/map-marker.png')}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
    </Marker>
  );
};
