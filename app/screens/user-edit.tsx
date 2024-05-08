import React, { useState } from 'react';
import { SafeAreaView, View, Alert } from 'react-native';
import { Row } from 'components/common/layout';
import styled from '@emotion/native';
import { Font14W600, Font12W400 } from 'components/common/text';
import { CustomHeader } from 'components/common/header';
import { RoundedButton } from 'components/common/button';
import { Icon } from 'components/common/icon';
import { InputLabel } from 'components/common/input';
import { ShadowBottom } from 'components/common/bottom-box';
import { theme } from '~/../theme';
import { NT_Input } from 'components/common/input';
import { useUser } from '~/hooks/user';
import { RootStackParamList } from './stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { useEditUser } from 'hooks/user/user-edit';

type Props = NativeStackScreenProps<RootStackParamList, 'MyPageEditScreen'>;

const MyPageEditScreen = ({ navigation, route }: Props) => {
  const { data: userInfo } = useUser();
  const editUserMutation = useEditUser();
  const currentNickname = route.params.nickname;
  const [input, setInput] = useState(currentNickname);
  const [image, setImage] = useState<Asset>();

  const selectImages = async () => {
    const { didCancel, assets } = await launchImageLibrary({
      mediaType: 'photo',
    });
    if (didCancel) return;
    if (assets) setImage(assets[0]);
  };

  const takePhoto = async () => {
    const { didCancel, assets } = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
    });
    if (didCancel) return;
    if (assets) setImage(assets[0]);
  };

  const save = async () => {
    try {
      const form = new FormData();
      if (input.trim() !== currentNickname)
        form.append('nickname', input.trim());
      if (image)
        form.append('profile_image', {
          name: image.fileName,
          type: image.type,
          uri: image.uri,
        });
      await editUserMutation.mutateAsync(form);
      Alert.alert('정보가 수정되었습니다.', '', [
        {
          text: '확인',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: '#FFFFFF', position: 'relative' }}
      />
      <CustomHeader
        title='마이페이지'
        navigation={navigation}
        bottomBorder={false}
      />
      <Container>
        <UserImageBox>
          <View>
            {/* TODO: profile_image placeholder 적용 */}
            <Avatar source={{ uri: image?.uri || userInfo?.profile_image }} />
            <CameraButton
              onPress={() => {
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
              {({ pressed }) => (
                <View style={{ opacity: pressed ? 0.5 : 1 }}>
                  <Icon
                    name='F_Camera'
                    size={20}
                    color={theme.palette.gray03}
                  />
                </View>
              )}
            </CameraButton>
          </View>
        </UserImageBox>
        <InfoEditBox>
          <BoxTitle>닉네임</BoxTitle>
          <NT_Input
            wrapStyle={
              {
                // backgroundColor: 'blue',
                // paddingVertical: 8,
              }
            }
            // inputProps={{ keyboardType: 'numeric', maxLength: 12 }}
            value={input}
            onChangeText={(text) => setInput(text)}
            placeholder='사용할 닉네임을 입력해주세요.'
            error={input.length > 12 ? true : false}
            // disabled={true}
          />

          <InputLabel>
            한글, 영어, 숫자만 사용할 수 있어요. (최대 12자)
          </InputLabel>
        </InfoEditBox>
      </Container>
      <ShadowBottom>
        <ApplyButtonWrap>
          <RoundedButton title='적용하기' onPress={save} />
          <InformationBox>
            <Icon name='S_Inform' size={13} color={theme.palette.primary} />
            <Font12W400>닉네임은 30일마다 한 번 바꿀 수 있어요.</Font12W400>
          </InformationBox>
        </ApplyButtonWrap>
      </ShadowBottom>
    </>
  );
};

export default MyPageEditScreen;

const Container = styled.ScrollView`
  /* padding: 0 20px; */
  /* height: 100%; */
  background-color: ${(p) => p.theme.palette.white};
`;

const UserImageBox = styled(Row)`
  margin-top: 20px;
  justify-content: center;
`;

const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  border-width: 1px;
  border-color: ${(p) => p.theme.palette.gray02};
  background-color: ${(p) => p.theme.palette.gray01};
  margin-right: 12px;
`;

const CameraButton = styled.Pressable`
  position: absolute;
  bottom: 0;
  left: 72px;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 100px;
  border-width: 1px;
  border-color: ${(p) => p.theme.palette.gray01};
  background: white;
`;

const InfoEditBox = styled.View`
  padding: 0 20px;
  margin-top: 30px;
  justify-content: center;
`;

const BoxTitle = styled(Font14W600)`
  margin-bottom: 16px;
`;

const InformationBox = styled(Row)`
  margin-top: 12px;
  align-items: flex-end;
  gap: 8px;
`;

const ApplyButtonWrap = styled.View`
  background: white;
  width: 100%;
`;
