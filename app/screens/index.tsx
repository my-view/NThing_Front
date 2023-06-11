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
import {Font16W500, UnderLine14} from '../components/common/text';
import {getWidthRatio, getHeightRatio} from '../assets/util/layout';

const RootScreen = ({navigation}: any) => {
  const {width, height} = useWindowDimensions();

  return (
    <SafeAreaView>
      <Container>
        <View
          style={{
            flex: 1,
          }}>
          <Text>NTHING</Text>
        </View>
        <SocialLoginWrap>
          <SocialSubTitle>sns로 간편 로그인</SocialSubTitle>
          <ButtonWrap>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('universityScreen');
              }}>
              <Image source={require('../assets/image/naver-btn.png')} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('universityScreen');
              }}>
              <Image source={require('../assets/image/kakao-btn.png')} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('universityScreen');
              }}>
              <Image source={require('../assets/image/google-btn.png')} />
            </TouchableWithoutFeedback>
          </ButtonWrap>
          <LaterLogin>나중에 로그인하기</LaterLogin>
        </SocialLoginWrap>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled(View)`
  padding: ${getHeightRatio(0)} 20px;
  height: 100%;
`;

const SocialLoginWrap = styled(View)`
  align-items: center;
`;

const SocialSubTitle = styled(Font16W500)`
  margin-bottom: 30px;
  // font-family: ${props => props.theme.font[500]};
  // color: ${props => props.theme.palette.primary};
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

export default RootScreen;
