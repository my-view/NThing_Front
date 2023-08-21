import React from 'react';
import {
  Image,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import styled from '@emotion/native';
import {
  Font10W600,
  Font15W600,
  Font18W600,
  Font18W700,
} from 'components/common/text';
import { Header } from 'components/common/header';
import Left from 'assets/image/Left.svg';
import Share from 'assets/image/Share.svg';
import { ShadowBottom } from 'components/common/bottom-box';
import { Button } from 'components/common/button';
import { theme } from '~/../theme';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Swiper from 'react-native-swiper';
import { HeartButton } from 'components/common/heart-button';
import { Row } from 'components/common/layout';

const EXAMPLE_IMAGE_PATH = '../assets/image/item-example.png';

const ITEM_IMAGES = [
  { id: 1, url: require(EXAMPLE_IMAGE_PATH) },
  { id: 2, url: require(EXAMPLE_IMAGE_PATH) },
  { id: 3, url: require(EXAMPLE_IMAGE_PATH) },
];

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
      <Container>
        {/* 사라진 Dot 찾아야함 */}
        <Swiper
          height={width}
          dot={<Dot style={{ opacity: 0.4 }} />}
          activeDot={<Dot />}
          paginationStyle={{ gap: 8 }}
        >
          {ITEM_IMAGES.map((image) => (
            <Image
              key={image.id}
              source={image.url}
              style={{ width: '100%', height: width }}
            />
          ))}
        </Swiper>
        <ManagerInfo>
          <Font15W600>당근토끼</Font15W600>
        </ManagerInfo>
        <ContentBox>
          <Font18W700>휴지 나눠서 사실 분</Font18W700>
        </ContentBox>
      </Container>
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
      <ShadowBottom>
        <Row
          style={{ flex: 1, justifyContent: 'space-between', marginBottom: 20 }}
        >
          <Row style={{ gap: 20 }}>
            <HeartButton isLike={true} />
            <View style={{ gap: 2 }}>
              <Font10W600>1개당</Font10W600>
              <Row style={{ gap: 10 }}>
                <Font18W600>2,500원</Font18W600>
                <View
                  style={{
                    height: 10,
                    width: 2,
                    backgroundColor: theme.palette.gray02,
                    borderRadius: 2,
                  }}
                />
                <Font18W600>
                  <Text style={{ color: theme.palette.primary }}>1</Text>/4명
                </Font18W600>
              </Row>
            </View>
          </Row>
          <Button
            onPress={() => {
              // post 요청
            }}
          >
            참여하기
          </Button>
        </Row>
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
  flex: 1;
  background-color: ${(p) => p.theme.palette.white};
`;

const ManagerInfo = styled.View`
  padding: 12px 20px;
`;

const ContentBox = styled.View`
  padding: 20px;
`;

export default TradeScreen;
