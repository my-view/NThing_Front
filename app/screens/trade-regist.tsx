import React from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from 'react-native';
import styled from '@emotion/native';
import { Font16W500, UnderLine14 } from '../components/common/text';
import { getWidthRatio, getHeightRatio } from '../assets/util/layout';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';

const TradeRegistScreen = ({ navigation }: any) => {
  const { width, height } = useWindowDimensions();

  const listSheetRef = React.useRef<BottomSheet>(null);
  const ListPoints = React.useMemo(() => ['22%', '50%', '76.8%'], []);
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
          <View
            style={{
              flex: 1,
            }}
          >
            <Text>거래 등록이오</Text>
          </View>
          <SocialLoginWrap>
            <SocialSubTitle>sns로 간편 로그인</SocialSubTitle>
            <ButtonWrap>
              <TouchableWithoutFeedback
                onPress={() => {
                  listSheetRef.current?.snapToIndex(2);
                }}
              >
                <Image source={require('../assets/image/naver-btn.png')} />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('universityScreen');
                }}
              >
                <Image source={require('../assets/image/kakao-btn.png')} />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('MainScreen');
                }}
              >
                <Image source={require('../assets/image/google-btn.png')} />
              </TouchableWithoutFeedback>
            </ButtonWrap>
            <LaterLogin>나중에 로그인하기</LaterLogin>
          </SocialLoginWrap>
        </Container>

        <BottomSheet
          ref={listSheetRef}
          snapPoints={ListPoints}
          index={-1}
          // backdropComponent={renderBackdrop}
        >
          <BottomSheetView>
            <Text>dfsfsdfsfsdfdfsdf</Text>
            <Text>dfsfsdfsfsdfdfsdf</Text>
            <Text>dfsfsdfsfsdfdfsdf</Text>
            <Text>dfsfsdfsfsdfdfsdf</Text>
            <Text>dfsfsdfsfsdfdfsdf</Text>
            <Text>dfsfsdfsfsdfdfsdf</Text>
            <Text>dfsfsdfsfsdfdfsdf</Text>
            <Text>dfsfsdfsfsdfdfsdf</Text>
            <Text>dfsfsdfsfsdfdfsdf</Text>
            <Text>dfsfsdfsfsdfdfsdf</Text>
            <Text>dfsfsdfsfsdfdfsdf</Text>
            <Text>dfsfsdfsfsdfdfsdf</Text>
            <Text>dfsfsdfsfsdfdfsdf</Text>
            <Text>dfsfsdfsfsdfdfsdf</Text>
            <Text>dfsfsdfsfsdfdfsdf</Text>
            <Text>dfsfsdfsfsdfdfsdf</Text>
            <Text>dfsfsdfsfsdfdfsdf</Text>
            <Text>dfsfsdfsfsdfdfsdf</Text>
            <Text>dfsfsdfsfsdfdfsdf</Text>
            <Text>dfsfsdfsfsdfdfsdf</Text>
            <Text>dfsfsdfsfsdfdfsdf</Text>
            <Text>dfsfsdfsfsdfdfsdf</Text>
            <Text>dfsfsdfsfsdfdfsdf</Text>
            <Text>dfsfsdfsfsdfdfsdf</Text>
            <Text>dfsfsdfsfsdfdfsdf</Text>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const Container = styled(View)`
  padding: ${getHeightRatio(0)} 20px;
  height: 100%;
  background-color: #ffffff;
`;

const SocialLoginWrap = styled(View)`
  align-items: center;
`;

const SocialSubTitle = styled(Font16W500)`
  margin-bottom: 30px;
  // font-family: ${(props) => props.theme.font[500]};
  // color: ${(props) => props.theme.palette.primary};
`;
const LaterLogin = styled(UnderLine14)`
  margin-top: 20px;
`;

const ButtonWrap = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 22px;
`;

export default TradeRegistScreen;
