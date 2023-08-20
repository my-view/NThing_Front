import React from 'react';
import {
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import styled from '@emotion/native';
import { Font13W500, Font15W500, Font16W600 } from 'components/common/text';
import { Header } from 'components/main/header';
import Left from 'assets/image/Left.svg';
import Share from 'assets/image/Share.svg';
import { ShadowBottom } from 'components/common/bottom-box';
import { Button } from 'components/common/button';
import Inform from 'assets/image/Inform.svg';
import { theme } from '~/../theme';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Swiper from 'react-native-swiper';

const TradeScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();

  // 상태바 설정인데 안드로이드에서만 적용되는지?
  StatusBar.setTranslucent(true);
  // StatusBar.setBackgroundColor('transparent');
  // StatusBar.setBarStyle('dark-content');

  const statusBarHeight =
    Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Swiper
        dot={<Dot style={{ opacity: 0.4 }} />}
        activeDot={<Dot />}
        paginationStyle={{ gap: 8 }}
      >
        <Image
          source={require('../assets/image/item-example.png')}
          style={{ width: '100%', height: width }}
        />
        <Image
          source={require('../assets/image/item-example.png')}
          style={{ width: '100%', height: width }}
        />
        <Image
          source={require('../assets/image/item-example.png')}
          style={{ width: '100%', height: width }}
        />
      </Swiper>
      <Header
        style={{
          position: 'absolute',
          width: '100%',
          top: statusBarHeight,
          backgroundColor: 'transparent',
          borderBottomWidth: 0,
        }}
      >
        <TouchableOpacity onPress={navigation.goBack}>
          <Left width={24} height={24} color={theme.palette.white} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // 공유하기
          }}
        >
          <Share width={24} height={24} color={theme.palette.white} />
        </TouchableOpacity>
      </Header>
      <Container></Container>
      <ShadowBottom>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Inform width={13} height={13} />
          <InformText>{`내가 구하고자 하는 인원의 수를 적으면\n가격이 자동으로 계산돼요`}</InformText>
        </View>
        <Button
          onPress={() => {
            // post 요청
          }}
        >
          등록
        </Button>
      </ShadowBottom>
    </View>
  );
};

const Dot = styled.View`
  width: 6px;
  height: 6px;
  background-color: ${(p) => p.theme.palette.white};
  border-radius: 6px;
`;

const Container = styled.ScrollView`
  padding: 20px 20px 120px;
  /* height: 100%; */
  background-color: ${(p) => p.theme.palette.white};
`;

const InformText = styled(Font13W500)`
  color: ${(p) => p.theme.palette.gray05};
`;

export default TradeScreen;
