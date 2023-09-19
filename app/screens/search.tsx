import React, { useEffect, useState } from 'react';
import styled from '@emotion/native';
import { Pressable, SafeAreaView, View } from 'react-native';
import { KeywordInput } from 'components/main/keyword';
import { Header } from 'components/common/header';
import { theme } from '~/../theme';
import { Font18W600 } from 'components/common/text';
import { getHeightRatio, getWidthRatio } from 'assets/util/layout';
import { Tag } from 'components/common/tag';
import { Icon } from 'components/common/icon';
import { getStorage, setStorage } from 'assets/util/storage';
import { CategoryIconButton } from '~/components/common/button';

const SearchScreen = ({ route, navigation }) => {
  const [searchKeyword, setSearchKeyword] = useState(route.params.keyword);
  const [latestKeywords, setLatestKeywords] = useState<string[]>([]);
  const STORAGE_LATEST_KEYWORD = 'latestKeyword';

  const navigateToSearchMap = (keyword: string) => {
    navigation.navigate('SearchMapScreen', {
      screen: 'SearchMapScreen',
      params: { keyword },
    });
  };

  const search = (keyword: string) => {
    if (!keyword.trim()) return;
    const updated = [
      keyword,
      ...latestKeywords.filter((item) => item !== keyword),
    ];
    setLatestKeywords(updated);
    setStorage(STORAGE_LATEST_KEYWORD, updated);
    navigateToSearchMap(keyword);
  };

  useEffect(() => {
    getStorage(STORAGE_LATEST_KEYWORD).then((keword) => {
      if (keword) setLatestKeywords(keword);
    });
  }, []);

  const test = [
    { icon: 'F_Delivery', navigation: '', title: '배달', id: 1 },
    { icon: 'F_Dress', navigation: '', title: '의류', id: 1 },
    { icon: 'F_Food', navigation: '', title: '식품', id: 1 },
    { icon: 'F_Necessity', navigation: '', title: '생필품', id: 1 },
    { icon: 'F_Etc', navigation: '', title: '기타', id: 1 },
  ];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Header>
        <Pressable onPress={navigation.goBack}>
          <Icon name={'S_Left'} size={24} color={theme.palette.black} />
        </Pressable>
        <KeywordInput
          value={searchKeyword}
          onChangeText={(text) => setSearchKeyword(text)}
          onSubmitEditing={(e) => {
            if (e.nativeEvent.text !== '') search(searchKeyword);
          }}
          placeholder='검색어를 입력해주세요'
          placeholderTextColor={theme.palette.gray03}
        />
        <Pressable onPress={() => search(searchKeyword)}>
          <Icon name={'S_Search'} size={24} color={theme.palette.black} />
        </Pressable>
      </Header>
      <Container>
        <SectionTitle>최근 검색어</SectionTitle>
        <KeywordContainer>
          {latestKeywords.map((item) => (
            <Tag
              key={item}
              onSelect={async () => {
                setSearchKeyword(item);
                search(item);
              }}
              onDelete={() => {
                const updated = latestKeywords.filter(
                  (keyword) => keyword !== item,
                );
                setLatestKeywords(updated);
                setStorage(STORAGE_LATEST_KEYWORD, updated);
              }}
            >
              {item}
            </Tag>
          ))}
        </KeywordContainer>
        <SectionTitle>카테고리</SectionTitle>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 28 }}>
          {test.map((info, i) => (
            <CategoryIconButton key={i} categoryInfo={info} />
          ))}
        </View>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled.View`
  padding: ${getHeightRatio(30)} ${getWidthRatio(20)};
  gap: 16px;
`;

const SectionTitle = styled(Font18W600)`
  margin-bottom: 18px;
`;

const KeywordContainer = styled.View`
  gap: 8px;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default SearchScreen;
