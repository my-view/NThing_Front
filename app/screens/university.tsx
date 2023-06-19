import React, { useState } from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import styled from '@emotion/native';
import { Input } from 'components/common/input';
import { getHeightRatio } from 'assets/util/layout';

const UniversityScreen = ({ navigation }) => {
  const [university, setUniversity] = useState('');
  return (
    <SafeAreaView>
      <Container>
        <MainText>{`학교를\n선택해 주세요`}</MainText>
        <Input
          value={university}
          onChangeText={(text) => setUniversity(text)}
          placeholder='학교명을 검색하세요'
          autoFocus
        />
        <Button
          onPress={() => navigation.navigate('UniversityMapModal')}
          title='선택'
        />
      </Container>
    </SafeAreaView>
  );
};

const Container = styled(View)`
  padding: ${getHeightRatio(136)} 20px;
`;

const MainText = styled(Text)`
  margin-bottom: 30px;
  color: black;
  font-size: 28px;
  font-weight: 600;
  line-height: 38px;
`;

export default UniversityScreen;
