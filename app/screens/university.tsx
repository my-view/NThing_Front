import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import styled from '@emotion/native';
import { Input } from 'components/common/input';
import { getHeightRatio } from 'assets/util/layout';
import { College } from 'types/common';
import { Autocomplete } from 'components/common/autocomplete';
import { useCollege } from '~/hooks/college';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'screens/stack';

type Props = NativeStackScreenProps<RootStackParamList, 'UniversityScreen'>;

const UniversityScreen = ({ navigation }: Props) => {
  const [input, setInput] = useState('');

  const { setSearchKeyword, searchCollege } = useCollege();

  const colleges = (searchCollege?.data as College[] | undefined) || [];

  useEffect(() => {
    if (!input.length) return;
    // setColleges(COLLEGE_MOCK_DATA);     // mock data
    setSearchKeyword(input);
  }, [input]);

  return (
    <SafeAreaView>
      <Container>
        <MainText>{`학교를\n선택해 주세요`}</MainText>
        <Input
          value={input}
          onChangeText={(text) => setInput(text.trim())}
          placeholder='학교명을 검색하세요'
          autoFocus
        />
        <Autocomplete
          data={colleges}
          onSelect={(id) => {
            const selected = colleges.find((item) => item.id === id) as College;
            const { latitude, longitude } = selected;
            navigation.navigate('UniversityMapModal', {
              college_id: selected.id,
              latitude,
              longitude,
            });
          }}
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
