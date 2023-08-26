import React, { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from '@emotion/native';
import { Font13W500, Font15W500, Font16W600 } from 'components/common/text';
import { getWidthRatio } from 'assets/util/layout';
import { Header } from '~/components/common/header';
import Left from 'assets/image/Left.svg';
import { Row } from 'components/common/layout';
import { theme } from '~/../theme';
import { ShadowBottom } from 'components/common/bottom-box';
import { Button } from 'components/common/button';
import Inform from 'assets/image/Inform.svg';
import Camera from 'assets/image/Camera.svg';
import Add from 'assets/image/Add.svg';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

const TradeRegistScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState<Asset[]>([]);
  const [description, setDescription] = useState('');

  const selectImages = async () => {
    const { didCancel, assets } = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 10 - images.length,
    });
    if (didCancel) return;
    if (assets)
      setImages((prev) => [
        ...prev,
        ...assets.filter((item) => !prev.find((image) => image.id === item.id)),
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

  // console.log(images[0]?.base64);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#FFFFFF', position: 'relative' }}
    >
      <Header style={{ position: 'relative', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={navigation.goBack}
          style={{ position: 'absolute', left: getWidthRatio(20) }}
        >
          <Left width={24} height={24} />
        </TouchableOpacity>
        <Font16W600>거래글 작성</Font16W600>
      </Header>
      {/*       <CustomHeader navigation={navigation} /> */}
      <Container>
        <ImageContainer>
          {images.length < 10 && (
            <Pressable
              onPress={() =>
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
                ])
              }
            >
              <ImageUploader>
                <Camera width={24} height={24} />
                <GraySmallText>{images.length}/10</GraySmallText>
              </ImageUploader>
            </Pressable>
          )}
          {images.map((image) => (
            <Image
              key={image.fileName}
              style={{ width: 72, height: 72 }}
              source={{ uri: image.uri }}
            />
          ))}
        </ImageContainer>
        <Box>
          <Font15W500>글 제목</Font15W500>
          <TextInput
            style={{ flex: 1 }}
            placeholder='최대 30자까지 입력가능합니다.'
            placeholderTextColor={theme.palette.gray01}
            maxLength={30}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </Box>
        <Box>
          <Font15W500>거래 희망 장소</Font15W500>
          <Pressable
            onPress={() => {
              navigation.navigate('UniversityMapModal');
            }}
          >
            <Add width={16} height={16} />
          </Pressable>
        </Box>
        <Box>
          <Font15W500>거래 날짜&시간</Font15W500>
          <Pressable
            onPress={() => {
              navigation.navigate('UniversityMapModal');
            }}
          >
            <Add width={16} height={16} />
          </Pressable>
        </Box>
        <Box>
          <Font15W500>N띵</Font15W500>
        </Box>
        <Box>
          <Font15W500>가격</Font15W500>
        </Box>
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
    </SafeAreaView>
  );
};

const Container = styled.ScrollView`
  padding: 20px 20px 120px;
  height: 100%;
  background-color: ${(p) => p.theme.palette.white};
`;

const ImageContainer = styled(Row)`
  flex-wrap: wrap;
  margin-bottom: 12px;
  gap: 12px;
`;

const ImageUploader = styled.View`
  width: 72px;
  height: 72px;
  padding: 20px 0 13px;
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

const Box = styled(Row)`
  padding: 18px 4px;
  gap: 13px;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${(p) => p.theme.palette.gray01};
`;

const ColumnBox = styled.View`
  padding: 18px 4px;
  gap: 18px;
`;

const InformText = styled(Font13W500)`
  color: ${(p) => p.theme.palette.gray05};
`;

export default TradeRegistScreen;
