import React, { useState } from 'react';
import {
  Image,
  Platform,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import styled from '@emotion/native';
import {
  Font10W600,
  Font12W500,
  Font12W600,
  Font13W400,
  Font15W600,
  Font16W500,
  Font16W600,
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
import { formatDate, formatPrice } from 'assets/util/format';
import moment from 'moment';

const EXAMPLE_IMAGE_PATH = '../assets/image/item-example.png';

const ITEM_IMAGES = [
  { id: 1, url: require(EXAMPLE_IMAGE_PATH) },
  { id: 2, url: require(EXAMPLE_IMAGE_PATH) },
  { id: 3, url: require(EXAMPLE_IMAGE_PATH) },
];

const MOCK_DATA = {
  id: 3,
  title: '휴지 나눠서 사실 분',
  description:
    '펩시제로라임 1+1 공동구매 하실분 펩시제로라임 1+1 공동구매 하실분펩시제로라임 1+1 공동구매 하실분펩시제로라임 1+1 공동구매 하실분펩시제로라임 1+1 공동구매 하실분펩시제로라임 1+1 공동구매 하실분펩시제로라임 1+1 공동구매 하실분펩시제로라임 1+1 공동구매 하실분펩시제로라임 1+1 공동구매 하실분펩시제로라임 1+1 공동구매 하실분',
  latitude: 123.213512123,
  longitude: 546.465151515,
  date: '2023-08-25 14:00:00',
  denominator: 2,
  numerator: 4,
  status: false,
  price: 4000,
  place: '서울대 정문 앞',
  updated_at: '2023-08-14 09:39:08',
  manager: '당근토끼',
  category_id: 1,
  category_name: '배달',
  liked: false,
};

const TradeScreen = ({ navigation }) => {
  const [comment, setComment] = useState('');
  const { width } = useWindowDimensions();

  // 상태바 설정인데 안드로이드에서만 적용되는지?
  StatusBar.setTranslucent(true);
  // StatusBar.setBackgroundColor('transparent');
  // StatusBar.setBarStyle('dark-content');

  const statusBarHeight =
    Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <ScrollContainer>
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
        <ManagerInfoBox>
          <ProfileImage>{/* TODO: image 넣기 */}</ProfileImage>
          <Font15W600>{MOCK_DATA.manager}</Font15W600>
        </ManagerInfoBox>
        <TradeInfoBox>
          <Font18W700>{MOCK_DATA.title}</Font18W700>
          <SubInfoWrapper>
            <Pressable>
              <GrayFont style={{ textDecorationLine: 'underline' }}>
                {MOCK_DATA.category_name}
              </GrayFont>
            </Pressable>
            <GrayFont>{` · ${formatDate(MOCK_DATA.updated_at)} 전`}</GrayFont>
          </SubInfoWrapper>
          <Row style={{ gap: 17, alignItems: 'flex-start', marginBottom: 8 }}>
            <Font12W600>거래 장소</Font12W600>
            <View style={{ gap: 7 }}>
              <Font12W500>{MOCK_DATA.place}</Font12W500>
              <Font12W500>
                {moment(MOCK_DATA.date).format('yyyy.MM.DD. hh:mm')}
              </Font12W500>
            </View>
          </Row>
          <Font16W500 style={{ lineHeight: 24 }}>
            {MOCK_DATA.description}
          </Font16W500>
        </TradeInfoBox>
        <CommentBox>
          <Font16W600>댓글(0)</Font16W600>
          <CommentInput
            value={comment}
            onChangeText={(v) => setComment(v)}
            placeholder='댓글을 입력해주세요'
          />
        </CommentBox>
      </ScrollContainer>
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
                <Font18W600>{formatPrice(MOCK_DATA.price)}원</Font18W600>
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
                    {MOCK_DATA.denominator}
                  </Text>
                  /{MOCK_DATA.numerator}명
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
  padding: 20px 20px 15px;
  border-bottom-width: 8px;
  border-bottom-color: ${(p) => p.theme.palette.gray01}66;
`;

const SubInfoWrapper = styled(Row)`
  margin: 14px 0 20px;
`;

const GrayFont = styled(Font13W400)`
  color: ${(p) => p.theme.palette.gray03};
`;

const CommentBox = styled.View`
  padding: 20px 20px 65px;
  gap: 30px;
`;

const CommentInput = styled.TextInput`
  padding: 14px;
  background-color: ${(p) => p.theme.palette.gray01}4D;
  border-radius: 4px;
  color: ${(p) => p.theme.palette.gray03};
`;

export default TradeScreen;