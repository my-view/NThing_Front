import React, { useEffect, useState } from 'react';
import styled from '@emotion/native';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import Left from 'assets/image/Left.svg';
import Search from 'assets/image/Search.svg';
import { KeywordInput } from 'components/main/keyword';
import { Header } from 'components/main/header';
import { theme } from '~/../theme';
import { Font18W600 } from '~/components/common/text';
import { getHeightRatio, getWidthRatio } from '~/assets/util/layout';
import AsyncStorage from '@react-native-community/async-storage';
import { Tag } from '~/components/common/tag';

const SearchScreen = ({ route, navigation }) => {
  const [searchKeyword, setSearchKeyword] = useState(route.params.keyword);
  const [latestKeywords, setLatestKeywords] = useState<string[]>([]);
  const STORAGE_LATEST_KEYWORD = 'latestKeyword';
  const navigateToHome = (keyword: string) => {
    navigation.navigate('MainScreen', {
      screen: 'HomeScreen',
      params: { keyword },
    });
  };
  const search = () => {
    if (!searchKeyword.trim()) return;
    if (!latestKeywords.includes(searchKeyword)) {
      AsyncStorage.setItem(
        STORAGE_LATEST_KEYWORD,
        JSON.stringify([searchKeyword, ...latestKeywords]),
      );
    }
    navigateToHome(searchKeyword);
  };
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_LATEST_KEYWORD, (_, result) => {
      if (!result) return;
      setLatestKeywords(JSON.parse(result));
    });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Header>
        <TouchableOpacity onPress={navigation.goBack}>
          <Left width={24} height={24} />
        </TouchableOpacity>
        <KeywordInput
          value={searchKeyword}
          onChangeText={(text) => setSearchKeyword(text)}
          onSubmitEditing={(e) => {
            if (e.nativeEvent.text !== '') search();
          }}
          placeholder='검색어를 입력해주세요'
          placeholderTextColor={theme.palette.gray03}
        />
        <TouchableOpacity onPress={search}>
          <Search width={24} height={24} />
        </TouchableOpacity>
      </Header>
      <Container>
        <Font18W600>최근 검색어</Font18W600>
        <KeywordContainer>
          {latestKeywords.map((item) => (
            <Tag
              key={item}
              onSelect={async () => {
                setSearchKeyword(item);
                const updated = [
                  item,
                  ...latestKeywords.filter((keyword) => keyword !== item),
                ];
                setLatestKeywords(updated);
                AsyncStorage.setItem(
                  STORAGE_LATEST_KEYWORD,
                  JSON.stringify(updated),
                );
                navigateToHome(item);
              }}
              onDelete={() => {
                const updated = latestKeywords.filter(
                  (keyword) => keyword !== item,
                );
                setLatestKeywords(updated);
                AsyncStorage.setItem(
                  STORAGE_LATEST_KEYWORD,
                  JSON.stringify(updated),
                );
              }}
            >
              {item}
            </Tag>
          ))}
        </KeywordContainer>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled.View`
  padding: ${getHeightRatio(30)} ${getWidthRatio(20)};
  gap: 16px;
`;

const KeywordContainer = styled.View`
  gap: 8px;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default SearchScreen;
