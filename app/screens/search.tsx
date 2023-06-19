import React from 'react';
import { Pressable, SafeAreaView, Text } from 'react-native';

const SearchScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Pressable onPress={navigation.goBack}>
        <Text>검색 페이지</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default SearchScreen;
