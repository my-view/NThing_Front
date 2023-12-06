import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import styled from '@emotion/native';
import { Input } from 'components/common/input';
import { getHeightRatio } from 'assets/util/layout';
import { College } from 'types/common';
import { Autocomplete } from 'components/common/autocomplete';
import { useCollege } from '~/hooks/college';
import { COLLEGE_MOCK_DATA } from '~/assets/mock/college';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './stack';

type Props = NativeStackScreenProps<RootStackParamList, 'UniversityScreen'>;

const UniversityScreen = ({ navigation }: Props) => {
  const [input, setInput] = useState('');
  const [colleges, setColleges] = useState<College[]>([]);

  const { setsearchForm, collegeList } = useCollege();

  useEffect(() => {
    if (!input.length) return;
    // mock data
    // setColleges(COLLEGE_MOCK_DATA);

    setsearchForm({ search_keyword: input });
    setColleges(collegeList);

    // TODO: 디바운스 적용?
    // 실제 데이터
    // fetch(
    //   `https://3063-1-225-155-14.ngrok-free.app/college?search_keyword=${input}`,
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setColleges(data);
    //   });
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
