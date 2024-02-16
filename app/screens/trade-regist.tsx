import React, { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import styled from '@emotion/native';
import { Font13W500, Font13W600, Font15W500 } from 'components/common/text';
import { Row } from 'components/common/layout';
import { theme } from '~/../theme';
import { ShadowBottom } from 'components/common/bottom-box';
import { BtnType, Button } from 'components/common/button';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { CustomHeader } from 'components/common/header';
import { Icon } from 'components/common/icon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AnimatedArrow } from 'components/common/animated-arrow';
import { DateTimePicker } from 'components/common/date-time-picker';
import { TradeDate, TradePlace } from 'types/common';
import { PreviewImage } from 'components/trade-regist/preview-image';
import { Input } from 'components/common/input';
import { formatPrice } from 'assets/util/format';
import axios from 'axios';
import moment from 'moment';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { usePurchaseDetail } from 'hooks/purchase/purchase-detail';
import { CompositeScreenProps } from '@react-navigation/native';
import { MainScreenParamList } from 'screens/main';
import { RootStackParamList } from 'screens/stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useFetchCategoryList } from '~/hooks/category';
import { Chip } from '~/components/common/chip';

const offset = 1000 * 60 * 60 * 9;
const krNow = new Date(new Date().getTime() + offset);
const nowHour = krNow.getHours();

const initialDate = {
  now: krNow,
  day: nowHour < 23 ? 0 : 1,
  hour: nowHour < 23 ? nowHour + 1 : 0,
  minute: 0,
  full: '',
};

const getDate = (tradeDate: TradeDate) => {
  const date = tradeDate.now;
  moment(date).add(tradeDate.day, 'days');
  moment(date).add(tradeDate.hour, 'hours');
  moment(date).add(tradeDate.minute, 'minutes');
  return moment(date).format('yyyy-MM-DD HH:mm:ss');
};

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainScreenParamList, 'TradeRegistScreen'>,
  NativeStackScreenProps<RootStackParamList>
>;

const TradeRegistScreen = ({ navigation, route }: Props) => {
  const { data: trade } = usePurchaseDetail(route.params?.id);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(0);
  const [images, setImages] = useState<Asset[]>([]);
  const [place, setPlace] = useState<TradePlace>({
    coord: { latitude: 0, longitude: 0 }, // TODO: 학교 위치로 초기값 채우기
    description: '',
  });
  const [date, setDate] = useState<TradeDate>(initialDate);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [nThing, setNThing] = useState({
    denominator: '', // 분모
    numerator: '', // 분자
  });
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const { data: categories } = useFetchCategoryList();

  const selectImages = async () => {
    const { didCancel, assets } = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 10 - images.length,
    });
    if (didCancel) return;
    if (assets)
      setImages((prev) => [
        ...prev,
        ...assets.filter(
          (item) => !prev.find((image) => image.fileName === item.fileName),
        ),
      ]);
  };

  const takePhoto = async () => {
    const { didCancel, assets } = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
    });
    if (didCancel) return;
    if (assets) setImages((prev) => [...prev, ...assets]);
  };

  const isValid =
    title.trim() &&
    category &&
    description.trim() &&
    place.coord &&
    place.description.trim() &&
    nThing.denominator &&
    nThing.numerator &&
    price.trim();

  const validate = () => {
    if (!title.trim()) throw '글 제목을 입력해주세요.';
    if (!category) throw '카테고리를 선택해주세요.';
    if (!description.trim()) throw '글 내용을 입력해주세요.';
    if (!place.coord) throw '거래 희망 장소를 입력해주세요.';
    if (!place.description.trim()) throw '거래 희망 장소 설명을 입력해주세요.';
    if (!nThing.denominator || !nThing.numerator)
      throw 'N띵 정보를 입력해주세요.';
    if (!price.trim()) throw '가격을 입력해주세요.';
  };

  const registTrade = async () => {
    try {
      validate();
      const form = new FormData();
      form.append('title', title);
      form.append('category_id', category);
      form.append('latitude', place.coord?.latitude);
      form.append('longitude', place.coord?.longitude);
      form.append('place', place.description);
      form.append('date', getDate(date));
      form.append('denominator', nThing.denominator);
      form.append('numerator', nThing.numerator);
      form.append('price', price);
      form.append('description', description);
      images.forEach((item) =>
        form.append('files', {
          name: item.fileName,
          type: item.type,
          uri: item.uri,
        }),
      );
      await axios
        .post('/purchase', form)
        .then((res) => res.data)
        .then(({ data }) => {
          console.warn(data);
          navigation.replace('TradeScreen', { data });
        });
    } catch (e) {
      if (typeof e === 'string') return Alert.alert(e);
      console.warn(e);
    }
  };

  useEffect(() => {
    // TODO: 수정할 때 원래 저장되어있던 거래글 정보 넣기
  }, [trade]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#FFFFFF', position: 'relative' }}
    >
      <CustomHeader title='거래글 작성' navigation={navigation} />
      <KeyboardAwareScrollView extraHeight={204}>
        <Row style={{ paddingTop: 20 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
          >
            <Pressable
              onPress={() => {
                if (images.length >= 10) return;
                Alert.alert('사진을 올려주세요.', '', [
                  {
                    text: '갤러리에서 선택하기',
                    onPress: selectImages,
                  },
                  {
                    text: '카메라로 촬영하기',
                    onPress: takePhoto,
                  },
                  { text: '취소', onPress: () => null, style: 'cancel' },
                ]);
              }}
            >
              <ImageUploader>
                <Icon size={24} name='F_Camera' color={theme.palette.gray03} />
                <GraySmallText>{images.length}/10</GraySmallText>
              </ImageUploader>
            </Pressable>
            {images.map((image) => (
              <PreviewImage
                key={image.fileName}
                image={image}
                onDelete={(deleting) =>
                  setImages((prev) =>
                    prev.filter((item) => item.fileName !== deleting.fileName),
                  )
                }
              />
            ))}
          </ScrollView>
        </Row>
        <Container>
          {/* 키보드 내용 가림 */}
          <TitleBox>
            <TextInput
              style={{ flex: 1, fontSize: 15 }}
              placeholder='글 제목'
              placeholderTextColor={theme.palette.gray01}
              maxLength={30}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            {title && categories && (
              <Row style={{ gap: 6 }}>
                {categories.map((item) => {
                  const isSelected = category === item.id;
                  return (
                    <Chip
                      key={item.id}
                      onSelect={() => {
                        if (isSelected) setCategory(0);
                        else setCategory(item.id);
                      }}
                      isSelected={isSelected}
                    >
                      {item.name}
                    </Chip>
                  );
                })}
              </Row>
            )}
          </TitleBox>
          <Pressable
            onPress={() =>
              navigation.navigate('TradeMapModal', {
                initialPlace: place,
                update: (updated: TradePlace) => setPlace(updated),
              })
            }
          >
            <Box>
              <Row style={{ flex: 1, justifyContent: 'space-between' }}>
                <Font15W500>거래 희망 장소</Font15W500>
                <Font13W600 style={{ color: theme.palette.primary }}>
                  {place.description}
                </Font13W600>
              </Row>
              <Icon name={'S_Add'} size={16} color={theme.palette.black} />
            </Box>
          </Pressable>
          <Pressable onPress={() => setIsDateOpen((prev) => !prev)}>
            <Box style={{ borderBottomWidth: isDateOpen ? 0 : 1 }}>
              <Row style={{ flex: 1, justifyContent: 'space-between' }}>
                <Font15W500>거래 날짜&시간</Font15W500>
                <Font13W600 style={{ color: theme.palette.primary }}>
                  {date.full}
                </Font13W600>
              </Row>
              <AnimatedArrow isOpen={isDateOpen} />
            </Box>
          </Pressable>
          {isDateOpen && (
            <Box style={{ justifyContent: 'center', gap: 20 }}>
              <DateTimePicker
                defaultDate={date}
                updateDate={(newDate) => setDate(newDate)}
              />
            </Box>
          )}
          <InputBox>
            <Font15W500>N띵</Font15W500>
            <Row style={{ gap: 6 }}>
              <NThingInput
                placeholder='n'
                maxLength={2}
                value={nThing.denominator}
                onChangeText={(text) =>
                  setNThing((prev) => {
                    return { ...prev, denominator: text };
                  })
                }
              />
              <NThingText>개로 나눠,</NThingText>
              <NThingInput
                placeholder='m'
                maxLength={2}
                value={nThing.numerator}
                onChangeText={(text) =>
                  setNThing((prev) => {
                    return { ...prev, numerator: text };
                  })
                }
              />
              <NThingText>개 가질래요</NThingText>
            </Row>
          </InputBox>
          <InputBox>
            <Font15W500>가격</Font15W500>
            <Row style={{ gap: 6 }}>
              <NThingText>개당</NThingText>
              <NThingText>
                <Text style={{ color: theme.palette.primary }}>
                  {formatPrice(
                    Math.ceil(Number(price) / Number(nThing.denominator || 1)),
                  ) || 0}
                </Text>
                원
              </NThingText>
              <Row style={{ position: 'relative' }}>
                <NThingInput
                  style={{
                    fontSize: 13,
                    paddingRight: 26,
                    minWidth: 96,
                    textAlign: 'right',
                  }}
                  placeholder='0'
                  maxLength={7}
                  value={price}
                  onChangeText={(text) => setPrice(text)}
                />
                <Font13W600 style={{ position: 'absolute', right: 9 }}>
                  원
                </Font13W600>
              </Row>
            </Row>
          </InputBox>
          <ColumnBox>
            <Font15W500>글 내용</Font15W500>
            <TextInput
              style={{ lineHeight: 24, minHeight: 144 }}
              placeholder={`- 거래할 상품이 어떤 물건인지 알려주세요.\n  (제품명, 브랜드명, 사이즈, 색상 등)\n- 가격이 확정되지 않은 경우 임의로 작성 후 문의를 통해 거래자와 상의하세요.\n- 거래할 장소를 헷갈리지 않게 구체적으로 알려주세요.\n- 거래할 날짜와 시간을 알려주세요.`}
              placeholderTextColor={theme.palette.gray01}
              multiline
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
          </ColumnBox>
        </Container>
      </KeyboardAwareScrollView>
      <ShadowBottom>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Icon size={13} name={'S_Inform'} color={theme.palette.primary} />
          <InformText>{`내가 구하고자 하는 인원의 수를 적으면\n가격이 자동으로 계산돼요`}</InformText>
        </View>
        <Button
          variant={BtnType[isValid ? 'PRIMARY' : 'DISABLED']}
          onPress={() => {
            if (!isValid) return;
            registTrade();
          }}
        >
          등록하기
        </Button>
      </ShadowBottom>
    </SafeAreaView>
  );
};

const Container = styled.View`
  padding: 10px 20px 120px;
  height: 100%;
  background-color: ${(p) => p.theme.palette.white};
`;

const ImageUploader = styled.View`
  width: 72px;
  height: 72px;
  padding: 20px 0 13px;
  margin-top: 10px;
  align-items: center;
  justify-content: space-between;
  background-color: ${(p) => p.theme.palette.gray01}66;
  border-radius: 4px;
`;

const GraySmallText = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: ${(p) => p.theme.palette.gray03};
`;

const TitleBox = styled.View`
  padding: 18px 4px;
  gap: 13px;
  border-bottom-width: 1px;
  border-bottom-color: ${(p) => p.theme.palette.gray01};
`;

const Box = styled(TitleBox)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const InputBox = styled(Box)`
  padding: 12px 4px;
`;

const NThingInput = styled(Input)`
  padding: 9.5px 15.5px;
  font-size: 15px;
`;

const NThingText = styled(Font13W600)`
  color: ${(p) => p.theme.palette.gray02};
`;

const ColumnBox = styled.View`
  padding: 18px 4px;
  gap: 18px;
`;

const InformText = styled(Font13W500)`
  color: ${(p) => p.theme.palette.gray05};
`;

export default TradeRegistScreen;
