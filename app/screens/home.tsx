import React, { useEffect, useState, useCallback } from 'react';
import {
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SelectBox } from '@components/common/select';
import styled from '@emotion/native';
import NaverMapView from 'react-native-nmap';
import { CustomMarker } from '@components/nmap/marker';
import { Font18W600 } from '@components/common/text';
import Search from '@assets/image/Search.svg';
import Down from '@assets/image/Down.svg';
import Left from '@assets/image/Left.svg';
import Close from '@assets/image/Close.svg';
import { Row } from '@components/common/layout';
import { Header } from 'components/main/header';
import { KeywordBox } from 'components/main/keyword';
import { BottomSheetHandleStyle } from '@components/common/bottomSheet-Handle';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import { Item } from '@components/common/item';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import { ITEM_LIST } from '@assets/mock/item-list';
import { filterType } from '~/types/common';

const HomeScreen = ({ route, navigation }: any) => {
  const windowHeight = Dimensions.get('window').height;
  const { keyword } = route.params;
  const [selectedPin, setSelectedPin] = useState<number>(); // 핀 목록이 담긴 array에서 선택된 핀의 index
  const PIN_DATA = [
    { id: 1, latitude: 37.564362, longitude: 126.977011 },
    { id: 2, latitude: 37.565051, longitude: 126.978567 },
    { id: 3, latitude: 37.565383, longitude: 126.976292 },
  ];

  const [selectValue, setSelectValue] = useState({
    nm: '최신순',
    cd: 'recent',
  });

  console.log('selectValue---', selectValue);
  const listSheetRef = React.useRef<BottomSheet>(null);
  const headerFullHeight = windowHeight - 76;

  const ListPoints = React.useMemo(
    () => ['1%', '24%', '37%', '50%', headerFullHeight],
    [],
  );

  const countries: filterType[] = [
    { nm: '최신순', cd: 'recent' },
    { nm: '가격순', cd: 'price' },
    { nm: '마감임박순', cd: 'i_dl' },
    { nm: '시간임박순', cd: 't_dl' },
  ];

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

  const handleSheetChange = useCallback((index: number) => {
    console.log('handleSheetChange', index);
  }, []);

  useEffect(() => {
    // TODO: 홈화면 접속 시 최초에 거래 목록 받아오기
    // fetch(
    //   'https://3b55-2001-e60-87dc-6fa1-fc8b-5655-9c11-29b3.ngrok-free.app/purchase',
    // )
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <GestureHandlerRootView>
        <Container>
          {keyword ? (
            <Header>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SearchScreen', {
                    keyword: keyword,
                  })
                }
              >
                <Left width={24} height={24} />
              </TouchableOpacity>
              <KeywordBox style={{ lineHeight: 36 }}>{keyword}</KeywordBox>
              <TouchableOpacity
                onPress={() =>
                  navigation.setParams({
                    keyword: '',
                  })
                }
              >
                <View style={{ width: 24 }}>
                  <Close width={16} height={16} />
                </View>
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
          <View style={{ height: '100%', paddingBottom: 160 }}>
            <NaverMapView
              style={{ width: '100%', height: '100%' }}
              showsMyLocationButton={false}
              zoomControl={false}
              center={{ ...PIN_DATA[selectedPin || 0], zoom: 16 }}
              onTouch={() => {
                listSheetRef.current?.snapToIndex(1);
              }}
              // onMapClick={(e) => console.warn('onMapClick', JSON.stringify(e))}
            >
              {PIN_DATA.map((pin, index) => (
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
              onLayout={(e) => console.log(e)}
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

export default HomeScreen;
