import React, { useEffect, useState, useCallback } from 'react';
import { Pressable, SafeAreaView, View, Dimensions, Alert } from 'react-native';
import { SelectBox } from '@components/common/select';
import styled from '@emotion/native';
import NaverMapView from 'react-native-nmap';
import { CustomMarker } from '@components/nmap/marker';
import { Font18W600 } from '@components/common/text';
import { Row } from '@components/common/layout';
import { Header } from 'components/common/header';
import { KeywordBox } from 'components/main/keyword';
import { BottomSheetHandleStyle } from '@components/common/bottomSheet-Handle';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Item } from '@components/common/item';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PURCHASE_ITEM_LIST } from 'assets/mock/purchase-item-list';
import { theme } from '~/../theme';
import { Icon } from 'components/common/icon';
import { PINS } from 'assets/mock/pins';
import { sortOptions } from 'assets/util/constants';
import { useMapTrade } from 'hooks/map';
import { MainScreenParamList } from 'screens/main';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'screens/stack';
import { getStorage } from 'assets/util/storage';
import { TOKEN_STORAGE_KEY } from 'assets/util/constants';
import { PurchaseItemType } from 'types/common';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainScreenParamList, 'HomeScreen'>,
  NativeStackScreenProps<RootStackParamList>
>;

const HomeScreen = ({ route, navigation }: Props) => {
  // STEP4: 페이지 빌드
  const { centerMapInfo, setCenterMapInfo, tradeList, isFirstLanding } =
    useMapTrade();
  const windowHeight = Dimensions.get('window').height;
  const { keyword } = route.params;
  const [selectedPin, setSelectedPin] = useState<number>(); // 핀 목록이 담긴 array에서 선택된 핀의 index
  const [selectValue, setSelectValue] = useState({
    nm: '최신순',
    cd: 'recent',
  });

  console.log('!!!tradeList', tradeList);

  // console.log('selectValue---', selectValue);
  const listSheetRef = React.useRef<BottomSheet>(null);
  const headerFullHeight = windowHeight - 76;

  const ListPoints = React.useMemo(
    () => ['1%', '24%', '37%', '50%', headerFullHeight],
    [],
  );

  const handleSheetChange = useCallback((index: number) => {
    // console.log('handleSheetChange', index);
  }, []);

  useEffect(() => {
    // TODO: 홈화면 접속 시 최초에 거래 목록 받아오기
    // fetch(
    //   'https://3b55-2001-e60-87dc-6fa1-fc8b-5655-9c11-29b3.ngrok-free.app/purchase',
    // )
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
  }, []);

  // console.log('isLogin', isLogin);

  // console.log('@@ userInfo', userInfo);

  const renderItem = useCallback(
    (item: PurchaseItemType, index: number) => (
      <Pressable
        key={index}
        onPress={async () => {
          const token = await getStorage(TOKEN_STORAGE_KEY);
          if (token) return navigation.navigate('TradeScreen', { id: 69 });
          // TODO: 로그인 유도 화면 필요
          Alert.alert('로그인 후 이용해주세요!');
          navigation.navigate('RootScreen');
        }}
      >
        <Item
          data={item}
          index={index}
          listLength={PURCHASE_ITEM_LIST.length - 1}
        />
      </Pressable>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    setTimeout(() => {
      listSheetRef.current?.snapToIndex(2);
    }, 400);
  }, [selectedPin]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <GestureHandlerRootView>
        <Container>
          {keyword ? (
            <Header>
              <Pressable
                onPress={() =>
                  navigation.navigate('SearchScreen', {
                    keyword: keyword,
                  })
                }
              >
                <Icon name={'S_Left'} size={24} fill={theme.palette.black} />
              </Pressable>
              <KeywordBox style={{ lineHeight: 36 }}>{keyword}</KeywordBox>
              <Pressable
                onPress={() =>
                  navigation.setParams({
                    keyword: '',
                  })
                }
              >
                <View style={{ width: 24 }}>
                  <Icon name={'S_Close'} size={16} fill={theme.palette.black} />
                </View>
              </Pressable>
            </Header>
          ) : (
            <Header>
              <Pressable onPress={() => console.warn('touched')}>
                <Row style={{ gap: 5 }}>
                  <Font18W600>서울대학교</Font18W600>
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
          <View style={{ height: '100%', paddingBottom: 160 }}>
            <NaverMapView
              style={{ width: '100%', height: '100%' }}
              showsMyLocationButton={false}
              // zoomControl={false}
              maxZoomLevel={19}
              minZoomLevel={14}
              center={centerMapInfo}
              onTouch={() => {
                listSheetRef.current?.snapToIndex(1);
              }}
              onCameraChange={(e) => {
                console.log('실행됨?');
                if (isFirstLanding) return;
                setCenterMapInfo({
                  longitude: e.longitude,
                  latitude: e.latitude,
                  zoom: e.zoom,
                });
              }}
              // onMapClick={(e) => console.warn('onMapClick', JSON.stringify(e))}
            >
              {tradeList?.map((pin, index) => (
                <CustomMarker
                  key={pin.id}
                  coordinate={pin}
                  onClick={() => {
                    setSelectedPin(index);
                  }}
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
            onChange={handleSheetChange}
            // backdropComponent={renderBackdrop}
          >
            <View
              style={{
                paddingLeft: 20,
                height: 14,
                paddingBottom: 20,
              }}
            >
              <SelectBox
                margin={selectValue.nm.length >= 4 ? 10 : 33}
                onChange={setSelectValue}
                options={sortOptions}
                defaultValue={selectValue}
              />
            </View>
            <BottomSheetScrollView
              // onLayout={(e) => console.log(e)}
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingBottom: 120,
                // paddingTop: 20,
              }}
            >
              {tradeList
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
