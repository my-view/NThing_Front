import React, { useState } from 'react';
import { Pressable, SafeAreaView, TouchableOpacity, View } from 'react-native';
import styled from '@emotion/native';
<<<<<<< HEAD
import NaverMapView from 'react-native-nmap';
import { CustomMarker } from 'components/nmap/marker';
import { getWidthRatio } from 'assets/util/layout';
import { Font15W500, Font18W600 } from 'components/common/text';
import Search from 'assets/image/Search.svg';
import Down from 'assets/image/Down.svg';
import Left from 'assets/image/Left.svg';
import Close from 'assets/image/Close.svg';
import { Row } from 'components/common/layout';

const HomeScreen = ({ navigation }) => {
  const [selectedPin, setSelectedPin] = useState<number>(); // 핀 목록이 담긴 array에서 선택된 핀의 index
  const [searchKeyword, setSearchKeyword] = useState('휴지');
  const PIN_DATA = [
    { id: 1, latitude: 37.564362, longitude: 126.977011 },
    { id: 2, latitude: 37.565051, longitude: 126.978567 },
    { id: 3, latitude: 37.565383, longitude: 126.976292 },
  ];
=======
import { Font16W500, UnderLine14 } from '../components/common/text';
import { getWidthRatio, getHeightRatio } from '../assets/util/layout';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const HomeScreen = ({ navigation }: any) => {
  const { width, height } = useWindowDimensions();
  const P0 = { latitude: 37.564362, longitude: 126.977011 };
  const P1 = { latitude: 37.565051, longitude: 126.978567 };
  const P2 = { latitude: 37.565383, longitude: 126.976292 };

  // Bottom Sheet
  const ListSnapPoints = React.useMemo(() => ['22%', '50%', '76.8%'], []);
  const sheetPriceRef = React.useRef<BottomSheet>(null);

  const renderBackdrop = React.useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );
>>>>>>> df7cc8f (:construction: bottom sheet WIP)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Container>
<<<<<<< HEAD
        {searchKeyword ? (
          <Header>
            <TouchableOpacity
              onPress={() => navigation.navigate('SearchScreen')}
            >
              <Left width={24} height={24} />
            </TouchableOpacity>
            <KeywordBox>
              <KeywordText>{searchKeyword}</KeywordText>
            </KeywordBox>
            <TouchableOpacity onPress={() => setSearchKeyword('')}>
              <Close width={16} height={16} />
            </TouchableOpacity>
          </Header>
        ) : (
          <Header>
            <Pressable onPress={() => console.warn('touched')}>
              <Row style={{ gap: 5 }}>
                <Font18W600>서울대학교</Font18W600>
                <Down width={16} height={16} />
              </Row>
            </Pressable>
            <TouchableOpacity
              onPress={() => navigation.navigate('SearchScreen')}
            >
              <Search width={24} height={24} />
            </TouchableOpacity>
          </Header>
        )}
        <View style={{ height: '100%' }}>
=======
        <View
          style={{
            height: 56,
            backgroundColor: 'red',
          }}
        >
          <Text>dfsdfsdf</Text>
        </View>
        <View
          style={{
            height: '100%',
          }}
        >
>>>>>>> df7cc8f (:construction: bottom sheet WIP)
          <NaverMapView
            style={{ width: '100%', height: '100%' }}
            showsMyLocationButton={false}
            zoomControl={false}
<<<<<<< HEAD
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
=======
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
>>>>>>> df7cc8f (:construction: bottom sheet WIP)
          </NaverMapView>
        </View>
        <BottomSheet
          ref={sheetPriceRef}
          snapPoints={ListSnapPoints}
          index={-1}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView>
            <Text>dfsfsdfsfsdfdfsdf</Text>
          </BottomSheetView>
        </BottomSheet>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled(View)`
  background-color: #000;
`;

const Header = styled(Row)`
  height: 56px;
  padding: 10px ${getWidthRatio(26)};
  justify-content: space-between;
  background-color: ${(p) => p.theme.palette.white};
`;

<<<<<<< HEAD
const KeywordBox = styled(Row)`
  flex: 1;
  height: 100%;
  margin: 0 17px 0 8px;
  padding-horizontal: 14px;
  background-color: ${(p) => p.theme.palette.gray01};
  border-radius: 4px;
=======
const SocialSubTitle = styled(Font16W500)`
  margin-bottom: 30px;
  // font-family: ${(props) => props.theme.font[500]};
  // color: ${(props) => props.theme.palette.primary};
`;
const LaterLogin = styled(UnderLine14)`
  margin-top: 20px;
>>>>>>> df7cc8f (:construction: bottom sheet WIP)
`;

const KeywordText = styled(Font15W500)`
  color: ${(p) => p.theme.palette.gray06};
`;

export default HomeScreen;
