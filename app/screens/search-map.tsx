import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, View, Dimensions, Alert, Pressable } from 'react-native';
import styled from '@emotion/native';
import NaverMapView from 'react-native-nmap';
import { CustomMarker } from '@components/nmap/marker';
import { Header } from '~/components/common/header';
import { KeywordBox } from 'components/main/keyword';
import { BottomSheetHandleStyle } from '@components/common/bottomSheet-Handle';
import { SelectBox } from '@components/common/select';
import { Icon } from '@components/common/icon';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Item } from '@components/common/item';
import { CLSButton } from '@components/nmap/current-location-search';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Coordinate, PurchaseItemType } from 'types/common';
import getDistanceFromLatLonInKm from 'assets/util/map';
import { theme } from '~/../theme';
import { defaultSortOption, sortOptions } from 'assets/util/constants';
import { RootStackParamList } from 'screens/stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainScreenParamList } from 'screens/main';
import { useMapControl } from 'hooks/map/action';
import { useMapTrade } from 'hooks/map';
import { useUser } from 'hooks/user';

type Props = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, 'SearchMapScreen'>,
  BottomTabScreenProps<MainScreenParamList>
>;

const SearchMapScreen = ({ route, navigation }: Props) => {
  console.log('SearchMapScreen>>>>>', route.params);
  const { keyword, isCategory } = route.params;
  const { data: userInfo } = useUser();
  const {
    defaultMapCenter,
    centerMapInfo,
    setCenterMapInfo,
    tradeList,
    isLoading,
    refetch,
  } = useMapTrade(
    {
      latitude: Number(userInfo?.college.latitude),
      longitude: Number(userInfo?.college.longitude),
    },
    keyword,
  );
  const [selectedSort, setSelectSort] = useState(defaultSortOption);
  const [mapView, setMapView] = useState(false);

  const {
    mapRef,
    listSheetRef,
    ListPoints,
    selectMarker,
    selectedPin,
    setSelectedPin,
  } = useMapControl();

  const renderItem = useCallback(
    (item: PurchaseItemType, index: number) => (
      <Item
        key={item.id}
        data={item}
        index={index}
        listLength={tradeList ? tradeList.length - 1 : 0}
      />
    ),
    [],
  );

  // const locationHandler = (e: {
  //   x: number;
  //   y: number;
  //   latitude: number;
  //   longitude: number;
  // }) => {
  //   Alert.alert(
  //     '',
  //     'Marker?',
  //     [
  //       { text: 'Cancel' },
  //       {
  //         text: 'OK',
  //         onPress: () => {
  //           setCurrentLocation({
  //             id: 3, // TODO: 타입 맞추려고 임의로 찍어놓은 거 수정
  //             latitude: e.latitude,
  //             longitude: e.longitude,
  //           });
  //           console.warn('onMapClick', JSON.stringify(e));
  //         },
  //       },
  //     ],
  //     { cancelable: false },
  //   );
  // };

  const [initLo, setInitLo] = useState({});
  // const [notMove, setNotMove] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <GestureHandlerRootView>
        <Container>
          <Header>
            <Pressable
              onPress={() => navigation.navigate('SearchScreen', { keyword })}
            >
              <Icon name={'S_Left'} size={24} color={theme.palette.black} />
            </Pressable>
            {isCategory ? (
              <KeywordBox
                style={{ lineHeight: 36, color: `${theme.palette.primary}` }}
              >
                {`# ${keyword}`}
              </KeywordBox>
            ) : (
              <KeywordBox style={{ lineHeight: 36 }}>{keyword}</KeywordBox>
            )}
            <Pressable
              onPress={() => navigation.navigate('HomeScreen', { keyword })}
            >
              <View style={{ width: 24 }}>
                <Icon name={'S_Close'} size={16} color={theme.palette.black} />
              </View>
            </Pressable>
          </Header>
          <View style={{ height: '100%' }}>
            <CLSWrap>
              <CLSButton />
            </CLSWrap>
            <NaverMapView
              style={{ width: '100%', height: '100%' }}
              showsMyLocationButton={false}
              // zoomControl={false}
              center={{
                latitude: defaultMapCenter.latitude,
                longitude: defaultMapCenter.longitude,
                zoom: 16,
              }}
              onTouch={() => {
                listSheetRef.current?.snapToIndex(1);
              }}
              nightMode={true}
              // onMapClick={(e) => locationHandler(e)}
              onCameraChange={(e) => {
                setMapView(true);
                if (!mapView) {
                  setInitLo(e.contentRegion[0]);
                }
                /// https://navermaps.github.io/android-map-sdk/reference/com/naver/maps/map/NaverMap.html#getContentRegion()
                // contentRegion = 지도의 콘텐츠 영역에 대한 좌표열을 반환, 4개의 좌표로 구성된 사각형으로 표현, 단 5개 0 = 4 같음
                // coveringRegion = 콘텐츠 패딩을 포함한 지도의 뷰 전체 영역에 대한 좌표열을 반환,  4개의 좌표로 구성된 사각형으로 표현, 단 5개 0 = 4 같음
                // getDistanceFromLatLonInKm(e.contentsRegion);
              }}
            >
              {tradeList?.map((pin, index) => (
                <CustomMarker
                  key={pin.id}
                  coordinate={pin}
                  onClick={() => setSelectedPin(index)}
                  isSelected={index === selectedPin}
                />
              ))}
            </NaverMapView>
          </View>
          <BottomSheet
            ref={listSheetRef}
            snapPoints={ListPoints}
            index={1}
            handleIndicatorStyle={BottomSheetHandleStyle}
          >
            <View style={{ paddingLeft: 20, height: 14, paddingBottom: 20 }}>
              <SelectBox
                margin={selectedSort.nm.length >= 4 ? 10 : 33}
                onChange={setSelectSort}
                options={sortOptions}
                defaultValue={selectedSort}
              />
            </View>
            <BottomSheetScrollView
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingBottom: 120,
              }}
            >
              {tradeList?.map(renderItem)}
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
