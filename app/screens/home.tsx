import React, { useEffect, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import styled from '@emotion/native';
import NaverMapView from 'react-native-nmap';
import { CustomMarker } from '@components/nmap/marker';
import { getWidthRatio } from '@assets/util/layout';
import { Font15W500, Font18W600 } from '@components/common/text';
import Search from '@assets/image/Search.svg';
import Down from '@assets/image/Down.svg';
import Left from '@assets/image/Left.svg';
import Close from '@assets/image/Close.svg';
import { Row } from '@components/common/layout';
import { BottomSheetHandleStyle } from '@components/common/bottomSheet-Handle';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { Item } from '@components/common/item';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import { ITEM_LIST } from '@assets/mock/item-list';

const HomeScreen = ({ navigation }: any) => {
  const [selectedPin, setSelectedPin] = useState<number>(); // 핀 목록이 담긴 array에서 선택된 핀의 index
  const [searchKeyword, setSearchKeyword] = useState('휴지');
  const PIN_DATA = [
    { id: 1, latitude: 37.564362, longitude: 126.977011 },
    { id: 2, latitude: 37.565051, longitude: 126.978567 },
    { id: 3, latitude: 37.565383, longitude: 126.976292 },
  ];

  const listSheetRef = React.useRef<BottomSheet>(null);
  const ListPoints = React.useMemo(() => ['1%', '37%', '50%', '88.5%'], []);
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <GestureHandlerRootView>
        <Container>
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
                onPress={() => {
                  navigation.navigate('SearchScreen');
                }}
              >
                <Search width={24} height={24} />
              </TouchableOpacity>
            </Header>
          )}
          <View style={{ height: '100%' }}>
            <NaverMapView
              style={{ width: '100%', height: '100%' }}
              showsMyLocationButton={false}
              zoomControl={false}
              center={{ ...PIN_DATA[selectedPin || 0], zoom: 16 }}
              // onTouch={() => console.log('onTouch')}
              // onMapClick={(e) => console.warn('onMapClick', JSON.stringify(e))}
            >
              {PIN_DATA.map((pin, index) => (
                <CustomMarker
                  key={pin.id}
                  coordinate={pin}
                  onClick={() => {
                    setSelectedPin(index);
                    listSheetRef.current?.snapToIndex(1);
                    // console.warn(`onClick!${pin.id}`);
                  }}
                  isSelected={index === selectedPin}
                />
              ))}
            </NaverMapView>
          </View>

          <BottomSheet
            ref={listSheetRef}
            snapPoints={ListPoints}
            index={0}
            handleIndicatorStyle={BottomSheetHandleStyle}
            // backdropComponent={renderBackdrop}
          >
            <BottomSheetView
              style={{
                paddingHorizontal: 20,
              }}
            >
              {ITEM_LIST.map((item, index) => (
                <Item key={index} data={item} />
              ))}
            </BottomSheetView>
          </BottomSheet>
        </Container>
      </GestureHandlerRootView>
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

const KeywordBox = styled(Row)`
  flex: 1;
  height: 100%;
  margin: 0 17px 0 8px;
  //padding-horizontal: 14px;
  background-color: ${(p) => p.theme.palette.gray01};
  border-radius: 4px;
`;

const KeywordText = styled(Font15W500)`
  color: ${(p) => p.theme.palette.gray06};
`;

export default HomeScreen;
