import React, { useState, useCallback } from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';
import { SelectBox } from '@components/common/select';
import styled from '@emotion/native';
import NaverMapView from 'react-native-nmap';
import { CustomMarker } from '@components/nmap/marker';
import { Font18W600 } from '@components/common/text';
import { Row } from '@components/common/layout';
import { Header } from 'components/common/header';
import { KeywordBox } from 'components/main/keyword';
import { BottomSheetHandleStyle } from '@components/common/bottomSheet-Handle';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Item, LoadingItem } from '@components/common/item';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PURCHASE_ITEM_LIST } from 'assets/mock/purchase-item-list';
import { theme } from '~/../theme';
import { Icon } from 'components/common/icon';
import { sortOptions } from 'assets/util/constants';
import { useMapTrade } from 'hooks/map';
import { MainScreenParamList } from 'screens/main';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'screens/stack';
import { PurchaseItemType } from 'types/common';
import { useMapControl } from '~/hooks/map/action';
import Animated from 'react-native-reanimated';
import { useUser } from '~/hooks/user';
import { userInfoType } from '~/types/user';
import { useFocusEffect } from '@react-navigation/native';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainScreenParamList, 'HomeScreen'>,
  NativeStackScreenProps<RootStackParamList>
>;

const HomeScreen = ({ route, navigation }: Props) => {
  const { keyword, latitude, longitude } = route.params;
  // STEP4: 페이지 빌드
  const {
    defaultMapCenter,
    centerMapInfo,
    setCenterMapInfo,
    tradeList,
    isLoading,
    refetch,
  } = useMapTrade({ latitude, longitude });
  const { mapRef, listSheetRef, ListPoints, selectMarker, selectedPin } =
    useMapControl();
  const userInfo = useUser();
  const userData = userInfo?.data as unknown as userInfoType | undefined;
  const [selectValue, setSelectValue] = useState({
    nm: '최신순',
    cd: 'recent',
  });

  useFocusEffect(() => {
    // console.log('@@@@@@@@@@@@@@리패치');
    refetch();
  });

  const renderItem = useCallback(
    (item: PurchaseItemType, index: number) => (
      <Item data={item} index={index} listLength={tradeList?.length - 1} />
    ),
    [tradeList],
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <GestureHandlerRootView>
        <Container>
          {keyword ? (
            <Header>
              <Pressable
                onPress={() => navigation.navigate('SearchScreen', { keyword })}
              >
                <Icon name={'S_Left'} size={24} fill={theme.palette.black} />
              </Pressable>
              <KeywordBox style={{ lineHeight: 36 }}>{keyword}</KeywordBox>
              <Pressable onPress={() => navigation.setParams({ keyword: '' })}>
                <View style={{ width: 24 }}>
                  <Icon name={'S_Close'} size={16} fill={theme.palette.black} />
                </View>
              </Pressable>
            </Header>
          ) : (
            <Header>
              <Pressable
                onPress={() => navigation.navigate('UniversityScreen')}
              >
                <Row style={{ gap: 5 }}>
                  <Font18W600>
                    {userData?.college.name || '학교 선택'}
                  </Font18W600>
                  <Icon name={'S_Down'} size={16} color={theme.palette.black} />
                </Row>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate('SearchScreen', {})}
              >
                <Icon name={'S_Search'} size={24} color={theme.palette.black} />
              </Pressable>
            </Header>
          )}

          <Animated.View>
            <NaverMapView
              ref={mapRef}
              style={{ width: '100%', height: '100%' }}
              showsMyLocationButton={false}
              maxZoomLevel={19}
              minZoomLevel={14}
              center={defaultMapCenter}
              onTouch={() => {
                // console.log('온터치?');
                // downTradeList();
              }}
              onCameraChange={(e) => {
                // console.log('온카메라체인지', e.latitude, e.longitude);
                setCenterMapInfo({
                  ...centerMapInfo,
                  longitude: e.longitude,
                  latitude: e.latitude,
                  zoom: e.zoom,
                });
              }}
              onMapClick={(e) => {
                // console.log('온맵클릭?');
                // downTradeList();
                // console.warn('onMapClick', JSON.stringify(e));
              }}
            >
              {tradeList?.map((pin, index) => (
                <CustomMarker
                  key={pin.id}
                  coordinate={pin}
                  onClick={() => {
                    selectMarker(index, pin);
                  }}
                  isSelected={index === selectedPin}
                />
              ))}
            </NaverMapView>
          </Animated.View>
          <BottomSheet
            ref={listSheetRef}
            snapPoints={ListPoints}
            index={1}
            handleIndicatorStyle={BottomSheetHandleStyle}
          >
            <BottomSheetView
              style={{ paddingLeft: 20, height: 14, paddingBottom: 20 }}
            >
              <SelectBox
                margin={selectValue.nm.length >= 4 ? 10 : 33}
                onChange={setSelectValue}
                options={sortOptions}
                defaultValue={selectValue}
              />
            </BottomSheetView>
            <BottomSheetScrollView
              // onLayout={(e) => console.log('스크롤 높이', e.nativeEvent.layout)}
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingBottom: 120,
              }}
            >
              {isLoading
                ? PURCHASE_ITEM_LIST.map((item) => (
                    <LoadingItem key={item.id} />
                  ))
                : tradeList
                ? tradeList.map(renderItem)
                : PURCHASE_ITEM_LIST.map(renderItem)}
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

export default HomeScreen;
