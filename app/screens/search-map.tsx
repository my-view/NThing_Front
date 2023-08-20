import React, { useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import styled from '@emotion/native';
import NaverMapView, { Marker, Polygon } from 'react-native-nmap';
import { CustomMarker } from '@components/nmap/marker';
import Search from '@assets/image/Search.svg';
import Down from '@assets/image/Down.svg';
import Left from '@assets/image/Left.svg';
import Close from '@assets/image/Close.svg';
import { Header } from '~/components/common/header';
import { KeywordBox } from 'components/main/keyword';
import { BottomSheetHandleStyle } from '@components/common/bottomSheet-Handle';
import { SelectBox } from '@components/common/select';
import { Icon, IconButton } from '@components/common/button';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { Item } from '@components/common/item';
import { CLSButton } from '@components/nmap/current-location-search';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import { ITEM_LIST } from '@assets/mock/item-list';
import { filterType } from '~/types/common';
import getDistanceFromLatLonInKm from '~/assets/util/map';
import { Text } from 'react-native-svg';
import { theme } from '~/../theme';

const SearchMapScreen = ({ route, navigation }: any) => {
  console.log('SearchMapScreen', route);
  const windowHeight = Dimensions.get('window').height;
  const { keyword } = route.params.params;

  const [selectedPin, setSelectedPin] = useState<number>(); // 핀 목록이 담긴 array에서 선택된 핀의 index
  const PIN_DATA = [
    { id: 1, latitude: 37.564362, longitude: 126.977011 },
    { id: 2, latitude: 37.565051, longitude: 126.978567 },
    { id: 3, latitude: 37.565383, longitude: 126.976292 },
  ];
  const [testCo, setTestCo] = useState([PIN_DATA[0], PIN_DATA[1], PIN_DATA[2]]);
  // center={{ ...PIN_DATA[selectedPin || 0], zoom: 16 }}

  // console.warn(testCo);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.53815725,
    longitude: 126.9307627,
  });

  const [selectValue, setSelectValue] = useState({
    nm: '최신순',
    cd: 'recent',
  });
  const [mapView, setMapView] = useState(false);
  const countries: filterType[] = [
    { nm: '최신순', cd: 'recent' },
    { nm: '가격순', cd: 'price' },
    { nm: '마감임박순', cd: 'i_dl' },
    { nm: '시간임박순', cd: 't_dl' },
  ];

  const listSheetRef = React.useRef<BottomSheet>(null);
  const headerFullHeight = windowHeight - 76;
  const ListPoints = React.useMemo(
    () => ['1%', '24%', '37%', '50%', headerFullHeight],
    [],
  );

  // useEffect(() => {
  //   // testCo
  //   getDistanceFromLatLonInKm(testCo[0]);
  // }, [testCo]);

  const handleSheetChange = useCallback((index: number) => {
    console.log('handleSheetChange', index);
  }, []);

  const renderItem = useCallback(
    (item: any, index: number) => (
      <Item
        key={index}
        data={item}
        index={index}
        listLength={ITEM_LIST.length - 1}
      />
    ),
    [],
  );
  useEffect(() => {
    setTimeout(() => {
      listSheetRef.current?.snapToIndex(2);
    }, 400);
  }, [selectedPin]);

  const locationHandler = (e) => {
    console.warn('mapClick', e);
    Alert.alert(
      '',
      'Marker?',
      [
        { text: 'Cancel' },
        {
          text: 'OK',
          onPress: () => {
            setCurrentLocation(e);
            console.warn('onMapClick', JSON.stringify(e));
          },
        },
      ],
      { cancelable: false },
    );
  };
  const [initLo, setInitLo] = useState({});
  const [notMove, setNotMove] = useState(false);

  // console.warn(initLo);
  useEffect(() => {
    // setTimeout(() => {
    setInitLo(testCo[0]);
    // }, 400);
  }, [mapView]);

  useEffect(() => {
    if (testCo[0] !== initLo) {
      console.log({ initLo });
      console.log({ testCo });
      console.log('이동했음-------');
    } else {
      setNotMove(true);
      console.log('이동안했음------');
    }
  }, [testCo]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <GestureHandlerRootView>
        <Container>
          <Header>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SearchScreen', {
                  keyword: keyword,
                })
              }
            >
              <Left width={24} height={24} color={theme.palette.black} />
            </TouchableOpacity>
            <KeywordBox style={{ lineHeight: 36 }}>{keyword}</KeywordBox>
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
              <View style={{ width: 24 }}>
                <Close width={16} height={16} />
              </View>
            </TouchableOpacity>
          </Header>
          <View style={{ height: '100%' }}>
            <CLSWrap>
              <CLSButton />
            </CLSWrap>
            <NaverMapView
              style={{ width: '100%', height: '100%' }}
              showsMyLocationButton={false}
              zoomControl={false}
              center={{ ...PIN_DATA[selectedPin || 0], zoom: 16 }}
              onTouch={() => {
                listSheetRef.current?.snapToIndex(1);
              }}
              nightMode={true}
              onMapClick={(e) => locationHandler(e)}
              onCameraChange={(e) => {
                setMapView(true);
                // console.warn(e.contentRegion[0]);

                setTestCo(e.contentRegion);
                if (!mapView) {
                  setInitLo(e.contentRegion[0]);
                }
                /// https://navermaps.github.io/android-map-sdk/reference/com/naver/maps/map/NaverMap.html#getContentRegion()
                // contentRegion = 지도의 콘텐츠 영역에 대한 좌표열을 반환, 4개의 좌표로 구성된 사각형으로 표현, 단 5개 0 = 4 같음
                // coveringRegion = 콘텐츠 패딩을 포함한 지도의 뷰 전체 영역에 대한 좌표열을 반환,  4개의 좌표로 구성된 사각형으로 표현, 단 5개 0 = 4 같음

                // console.warn(e.coveringRegion);
                // getDistanceFromLatLonInKm(e.contentsRegion);
              }}
              // onMapClick={(e) => console.warn('onMapClick', JSON.stringify(e))}
            >
              {/* <Marker
                image={require('../assets/image/csl-button.png')}
                width={153}
                height={36}
                coordinate={PIN_DATA[0]}
              /> */}
              {PIN_DATA.map((pin, index) => (
                <CustomMarker
                  key={pin.id}
                  coordinate={pin}
                  onClick={() => {
                    setSelectedPin(index);
                    // console.warn(`onClick!${pisn.id}`);
                  }}
                  isSelected={index === selectedPin}
                />
              ))}
              {/* <Polygon
                coordinates={[...testCo] || []}
                color={`rgba(0, 0, 0, 0.5)`}
                onClick={() => console.warn('onClick! polygon')}
              /> */}
              <CustomMarker coordinate={currentLocation} />
            </NaverMapView>
          </View>
          <BottomSheet
            ref={listSheetRef}
            snapPoints={ListPoints}
            index={1}
            handleIndicatorStyle={BottomSheetHandleStyle}
            onChange={handleSheetChange}
            // backdropComponent={renderBackdrop}
          >
            <View
              style={{
                paddingLeft: 20,
                height: 14,
                paddingBottom: 20,
                // backgroundColor: 'blue',
              }}
            >
              <SelectBox
                value={selectValue}
                onChange={setSelectValue}
                options={countries}
                defaultValue={selectValue}
              />
            </View>
            <BottomSheetScrollView
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingBottom: 120,
              }}
            >
              {ITEM_LIST.map(renderItem)}
            </BottomSheetScrollView>
          </BottomSheet>
        </Container>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const Container = styled(View)`
  background-color: #000;
`;

const CLSWrap = styled(View)`
  margin-top: 16px;
  left: 25%;
  margin-left: 25px;
  z-index: 9999;
  position: absolute;
`;

export default SearchMapScreen;
