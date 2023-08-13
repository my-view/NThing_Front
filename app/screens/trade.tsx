import React from 'react';
import { SafeAreaView, StatusBar, TouchableOpacity, View } from 'react-native';
import styled from '@emotion/native';
import { Font13W500, Font15W500, Font16W600 } from 'components/common/text';
import { getWidthRatio } from 'assets/util/layout';
import { Header } from 'components/main/header';
import Left from 'assets/image/Left.svg';
import { ShadowBottom } from 'components/common/bottom-box';
import { Button } from 'components/common/button';
import Inform from 'assets/image/Inform.svg';
import { theme } from '~/../theme';

const TradeScreen = ({ navigation }) => {
  StatusBar.setBackgroundColor('transparent');
  return (
    <SafeAreaView style={{ flex: 1, position: 'relative' }}>
      <Header
        style={{
          position: 'relative',
          justifyContent: 'center',
          backgroundColor: 'gray',
        }}
      >
        <TouchableOpacity
          onPress={navigation.goBack}
          style={{ position: 'absolute', left: getWidthRatio(20) }}
        >
          <Left width={24} height={24} color={theme.palette.white} />
        </TouchableOpacity>
        <Font16W600>거래글 작성</Font16W600>
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
    </SafeAreaView>
  );
};

const Container = styled.ScrollView`
  padding: 20px 20px 120px;
  height: 100%;
  background-color: ${(p) => p.theme.palette.white};
`;

const InformText = styled(Font13W500)`
  color: ${(p) => p.theme.palette.gray05};
`;

export default TradeScreen;
