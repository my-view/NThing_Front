import React from 'react';
import { SafeAreaView, View, Pressable, Alert } from 'react-native';
import { Row } from 'components/common/layout';
import styled from '@emotion/native';
import {
  Font20W700,
  UnderLine20,
  Font12W600,
  Font16W600,
  Font16W700,
} from 'components/common/text';
import { CustomHeader } from 'components/common/header';
import { DecodeTokenState } from 'state/user';
import { useRecoilValue } from 'recoil';
import { Icon } from 'components/common/button';
import { ListItem } from 'components/common/list-item';
import { Divider } from 'components/common/divider';
import { theme } from '~/../theme';
import { MenuListType } from 'types/common';

const tradeHistoryMenuList: MenuListType[] = [
  {
    id: 1,
    title: '찜한 거래',
    icon: 'S_Heart',
    navigate: 'heartTrade',
  },
  {
    id: 2,
    title: '내가 연 거래',
    icon: 'S_Buy',
    navigate: 'MyTrade',
  },
  {
    id: 3,
    title: '참여한 거래',
    icon: 'S_Sell',
    navigate: 'JoinTrade',
  },
];

const csMenuList: MenuListType[] = [
  {
    id: 1,
    title: '공지사항',
    icon: 'S_Notice',
    navigate: 'Notice',
  },
  {
    id: 2,
    title: '1:1 문의',
    icon: 'S_HeadSet',
    navigate: 'OneByOne',
  },
  {
    id: 3,
    title: 'FAQ',
    icon: 'S_OnebyOne',
    navigate: 'FAG',
  },
];

const MyPageScreen = ({ navigation }: any) => {
  const isLoginUser = useRecoilValue(DecodeTokenState);
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#FFFFFF', position: 'relative' }}
    >
      <CustomHeader
        title='마이페이지'
        // useLeftButton={false}
        navigation={navigation}
        bottomBorder={false}
        // renderRightButton={() => {
        //   return (
        //     <Pressable onPress={() => console.log('123')}>
        //       <Text>rightButton</Text>
        //     </Pressable>
        //   );
        // }}
      />
      <Container>
        <View style={{ paddingHorizontal: 20 }}>
          <UserInfoWrap>
            <UserInfo>
              {isLoginUser ? (
                <>
                  <Avatar style={{ backgroundColor: 'green' }} />
                  <Font20W700>띵띵이</Font20W700>
                </>
              ) : (
                <>
                  <Avatar />
                  <Pressable onPress={() => navigation.navigate('RootScreen')}>
                    <UnderLine20>로그인하기</UnderLine20>
                  </Pressable>
                </>
              )}
            </UserInfo>
            <EditButton
              onPress={() => {
                if (isLoginUser) {
                  navigation.navigate('MyPageEditScreen');
                } else {
                  Alert.alert('로그인 유저만 이용가능합니다', '', [
                    {
                      text: '확인',
                      onPress: () => navigation.navigate('RootScreen'),
                    },
                  ]);
                }
              }}
            >
              <EditText>프로필 수정</EditText>
            </EditButton>
          </UserInfoWrap>
          <UniversityInfo>
            <Icon name='F_School' size={24} color={theme.palette.white} />
            {isLoginUser ? (
              <Font16W600 style={{ color: 'white' }}>서울대학교</Font16W600>
            ) : (
              <Font16W600 style={{ color: 'white' }}>
                학교를 인증해주세요.
              </Font16W600>
            )}
          </UniversityInfo>
        </View>

        <MenuTitle>거래 내역</MenuTitle>
        {tradeHistoryMenuList.map((el: MenuListType, i) => (
          <ListItem key={i} data={el} />
        ))}
        <ListDivider />
        <MenuTitle>고객센터</MenuTitle>
        {csMenuList.map((el: MenuListType, i) => (
          <ListItem key={i} data={el} />
        ))}
      </Container>
    </SafeAreaView>
  );
};

export default MyPageScreen;

const Container = styled.ScrollView`
  /* padding: 0 20px; */
  /* height: 100%; */
  background-color: ${(p) => p.theme.palette.white};
`;

const UserInfoWrap = styled(Row)`
  margin-top: 7px;
  justify-content: space-between;
`;

const UserInfo = styled(Row)``;

const Avatar = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 100px;
  background-color: #b6b6b6;
  margin-right: 12px;
`;

const EditButton = styled.Pressable`
  padding: 8px;
  border-width: 1px;
  border-radius: 4px;
  border-color: ${(p) => p.theme.palette.gray01};
`;

const EditText = styled(Font12W600)`
  color: ${(p) => p.theme.palette.gray04};
`;

const UniversityInfo = styled.Pressable`
  gap: 8px;
  padding: 16px 15px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  background-color: ${(p) => p.theme.palette.primary};
  margin-top: 20px;
`;

const MenuTitle = styled(Font16W700)`
  line-height: 18px;
  margin-top: 26px;
  margin-bottom: 10px;
  padding-left: 20px;
`;

const ListDivider = styled(Divider)`
  margin-top: 15px;
`;
