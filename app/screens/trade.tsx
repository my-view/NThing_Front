import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  Pressable,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import styled from '@emotion/native';
import {
  Font10W600,
  Font12W600,
  Font13W400,
  Font15W600,
  Font16W500,
  Font18W600,
  Font18W700,
} from 'components/common/text';
import { Header } from 'components/common/header';
import { ShadowBottom } from 'components/common/bottom-box';
import { Button } from 'components/common/button';
import { Icon } from 'components/common/icon';
import { theme } from '~/../theme';
import { getStatusBarHeight } from 'react-native-safearea-height';
import Swiper from 'react-native-swiper';
import { HeartButton } from 'components/common/heart-button';
import { Row } from 'components/common/layout';
import {
  formatElapsedTime,
  formatKorDate,
  formatPrice,
} from 'assets/util/format';
import { Comments } from 'components/trade/comments';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { usePurchaseDetail } from 'hooks/purchase/purchase-detail';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './stack';

type Props = NativeStackScreenProps<RootStackParamList, 'TradeScreen'>;

const TradeScreen = ({ navigation, route }: Props) => {
  const { data: preData, id } = route.params;
  const { data: axiosRes } = usePurchaseDetail(preData?.id || id);
  const [scroll, setScroll] = useState(0);
  const [isTransparent, setIsTransparent] = useState(true);
  const { width } = useWindowDimensions();

  console.log(axiosRes);
  const statusBarHeight =
    Platform.OS === 'ios'
      ? getStatusBarHeight(true)
      : StatusBar.currentHeight || 0;
  const iconColor = isTransparent ? theme.palette.white : theme.palette.black;
  const HEADER_HEIGHT = 56;

  useEffect(() => {
    if (isTransparent && scroll > width - statusBarHeight - HEADER_HEIGHT) {
      setIsTransparent(false);
      return StatusBar.setBarStyle('dark-content');
    }
    if (!isTransparent && scroll < width - statusBarHeight - HEADER_HEIGHT) {
      setIsTransparent(true);
      return StatusBar.setBarStyle('light-content');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scroll]);

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    return () => StatusBar.setBarStyle('dark-content');
  }, []);

  const tradeDetail = axiosRes?.data || preData;
  if (!tradeDetail) return null;

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        paddingTop: isTransparent ? 0 : statusBarHeight,
      }}
    >
      <ScrollContainer
        onScroll={(e) => setScroll(e.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
      >
        <Swiper
          height={isTransparent ? width : width - statusBarHeight}
          dot={<Dot style={{ opacity: 0.4 }} />}
          activeDot={<Dot />}
          paginationStyle={{ gap: 8 }}
        >
          {tradeDetail.images.map((image) => (
            <Image
              key={image.id}
              source={{ uri: image.url }}
              style={{ width: '100%', height: width }}
            />
          ))}
        </Swiper>
        <KeyboardAwareScrollView>
          <ManagerInfoBox>
            <ProfileImage>{/* TODO: image 넣기 */}</ProfileImage>
            <Font15W600>{tradeDetail.manager}</Font15W600>
          </ManagerInfoBox>
          <TradeInfoBox>
            <Font18W700>{tradeDetail.title}</Font18W700>
            <SubInfoWrapper>
              <Pressable
                onPress={() =>
                  navigation.navigate('SearchMapScreen', {
                    keyword: tradeDetail.category_name,
                    isCategory: true,
                  })
                }
              >
                <GrayFont style={{ textDecorationLine: 'underline' }}>
                  {tradeDetail.category_name}
                </GrayFont>
              </Pressable>
              <GrayFont>{` · ${formatElapsedTime(
                tradeDetail.updated_at,
              )} 전`}</GrayFont>
            </SubInfoWrapper>
            <Row
              style={{ gap: 17, alignItems: 'flex-start', marginBottom: 20 }}
            >
              <TagBox>
                <Icon name='F_Pin' size={12} />
                <TagText>{tradeDetail.place}</TagText>
              </TagBox>
              <TagBox>
                <Icon name='F_Clock' size={12} />
                <TagText>{formatKorDate(tradeDetail.date)}</TagText>
              </TagBox>
            </Row>
            <Font16W500 style={{ lineHeight: 24 }}>
              {tradeDetail.description}
            </Font16W500>
          </TradeInfoBox>
          <Comments />
        </KeyboardAwareScrollView>
      </ScrollContainer>
      <Header
        style={{
          position: 'absolute',
          width: '100%',
          top: statusBarHeight,
          backgroundColor: isTransparent
            ? 'rgba(255, 255, 255, 0)'
            : theme.palette.white,
          borderBottomWidth: isTransparent ? 0 : 1,
        }}
      >
        <Pressable onPress={navigation.goBack}>
          <Icon name='S_Left' size={24} color={iconColor} />
        </Pressable>
        <Pressable
          onPress={() => {
            // 공유하기
          }}
        >
          <Icon name='S_Share' size={24} color={iconColor} />
        </Pressable>
      </Header>
      <ShadowBottom>
        <Row style={{ gap: 20 }}>
          <HeartButton isLike={true} />
          <View style={{ gap: 2 }}>
            <Font10W600>1개당</Font10W600>
            <Row style={{ gap: 10 }}>
              <Font18W600>{formatPrice(tradeDetail.price)}원</Font18W600>
              <View
                style={{
                  height: 10,
                  width: 2,
                  backgroundColor: theme.palette.gray02,
                  borderRadius: 2,
                }}
              />
              <Font18W600>
                <Text style={{ color: theme.palette.primary }}>
                  {tradeDetail.denominator}
                </Text>
                /{tradeDetail.numerator}명
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

const ScrollContainer = styled.ScrollView`
  flex: 1;
  background-color: ${(p) => p.theme.palette.white};
  margin-bottom: 80px;
`;

const ManagerInfoBox = styled(Row)`
  padding: 12px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #f3f5f7;
  gap: 10px;
`;

const ProfileImage = styled.View`
  width: 36px;
  height: 36px;
  background-color: ${(p) => p.theme.palette.gray01};
  border-radius: 36px;
`;

const TradeInfoBox = styled.View`
  padding: 20px 20px 50px;
  border-bottom-width: 8px;
  border-bottom-color: ${(p) => p.theme.palette.gray01}66;
`;

const SubInfoWrapper = styled(Row)`
  margin: 14px 0 20px;
`;

const GrayFont = styled(Font13W400)`
  color: ${(p) => p.theme.palette.gray03};
`;

const TagBox = styled(Row)`
  padding: 7px 8px 7px 10px;
  gap: 4px;
  background-color: #f6f6f6;
  border-radius: 4px;
`;

const TagText = styled(Font12W600)`
  color: ${(p) => p.theme.palette.gray04};
`;

export default TradeScreen;
