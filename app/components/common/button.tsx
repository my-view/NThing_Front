import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/native';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { Font12W500, Font13W600, Font16W600 } from 'components/common/text';
import {
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { usePressableAnimated } from '~/hooks/animated/usePressableAnimated';
import { MenuListType } from '~/types/common';
import { navigationRef } from '~/../RootNavigation';
import { Icon } from './icon';
import { getCategoryListAPI } from '~/api/category';
import { useFocusEffect } from '@react-navigation/native';

import { SvgCssUri } from 'react-native-svg';

export enum BtnSize {
  SMALL = '6px 12px',
  MEDIUM = '11.5px 18px',
}

export const Button: React.FCC<{ onPress: () => void; size?: BtnSize }> = ({
  onPress,
  size = BtnSize.MEDIUM,
  children,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Container size={size}>
        <ButtonTitle>{children}</ButtonTitle>
      </Container>
    </Pressable>
  );
};

const Container = styled.View<{ size: BtnSize }>`
  padding: ${(p) => p.size};
  background-color: ${(p) => p.theme.palette.primary};
  border-radius: 4px;
`;

const ButtonTitle = styled(Font13W600)`
  color: ${(p) => p.theme.palette.white};
`;

type RoundedButtonType = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export const RoundedButton = ({
  title,
  onPress,
  disabled,
}: RoundedButtonType) => {
  const DefaultButtonStyle = {
    width: '100%',
    paddingVertical: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34C185',
  };

  const DisabledButtonStyle = {
    ...DefaultButtonStyle,
    backgroundColor: '#E1E5EC',
  };

  return (
    <Pressable
      style={disabled ? DisabledButtonStyle : DefaultButtonStyle}
      onPress={onPress}
    >
      <RoundedButtonText>{title}</RoundedButtonText>
    </Pressable>
  );
};

const RoundedButtonText = styled(Font16W600)`
  text-align: center;
  font-weight: 500;
  color: white;
`;

export const CategoryIconButton: React.FC<{
  // categoryInfo: MenuListType;
}> = () => {
  const [categoryData, setCategoryData] = useState();
  const [loading, setLoading] = React.useState(true);
  const onError = (e: Error) => {
    console.log(e.message);
    setLoading(false);
  };
  const onLoad = () => {
    console.log('Svg loaded!');
    setLoading(false);
  };
  useFocusEffect(
    useCallback(() => {
      const loadCategoryData = async () => {
        try {
          const categoryList = await getCategoryListAPI();
          setCategoryData(categoryList);
        } catch (err) {
          console.log('err', err);
        }
      };
      loadCategoryData();
    }, []),
  );

  console.log('categoryList', categoryData);

  const { pan, animatedStyles } = usePressableAnimated();

  return (
    <>
      {categoryData?.map((el) => (
        <CategoryButtonWrap
          id={`${el.id}`}
          onPress={() => {
            navigationRef.current.navigate('SearchMapScreen', {
              screen: 'SearchMapScreen',
              params: {
                keyword: el.name,
                isCategory: true,
              },
            });
          }}
        >
          <GestureHandlerRootView>
            <GestureDetector gesture={pan}>
              <Animated.View style={[animatedStyles]}>
                <View
                  style={{
                    justifyContent: 'center',
                  }}
                >
                  {/* <Icon
                    name={`${el.image}`}
                    size={30}
                    style={{ marginBottom: 10 }}
                  /> */}
                  <SvgCssUri
                    uri={el.image}
                    height={30}
                    width={30}
                    onError={onError}
                    onLoad={onLoad}
                  />
                  {loading && (
                    <ActivityIndicator size='large' color='#dbdbdb' />
                  )}

                  <Font12W500 style={{ textAlign: 'center' }}>
                    {el.name}
                  </Font12W500>
                </View>
              </Animated.View>
            </GestureDetector>
          </GestureHandlerRootView>
        </CategoryButtonWrap>
      ))}
    </>
  );
};

const CategoryButtonWrap = styled.Pressable`
  align-items: center;
  justify-content: center;
  /* background-color: gray; */
  width: 76px;
  height: 60px;
  /* height: 50%; */
`;
