import React from 'react';
import { SafeAreaView, View } from 'react-native';
import styled from '@emotion/native';
import { Font16W500, UnderLine14 } from 'components/common/text';
import { getHeightRatio } from 'assets/util/layout';
import { CustomHeader } from 'components/common/header';

const ChatingScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <CustomHeader
        title='채팅'
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
      <Container></Container>
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

export default ChatingScreen;
