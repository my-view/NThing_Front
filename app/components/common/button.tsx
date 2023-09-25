import React from 'react';
import styled from '@emotion/native';
import { Pressable, ViewStyle, View } from 'react-native';
import { Font13W600, Font16W600, Font12W500 } from 'components/common/text';
import { Icon } from './icon';
import { MenuListType } from '~/types/common';
import Animated from 'react-native-reanimated';
import {
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { usePressableAnimated } from '~/hooks/animated/usePressableAnimated';
import { navigationRef } from './../../../RootNavigation';
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
  const DefaultButtonStyle: ViewStyle = {
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

export const CategoryIconButton: React.FC<{ categoryInfo: MenuListType }> = ({
  categoryInfo,
}) => {
  const { pan, animatedStyles } = usePressableAnimated();

  return (
    <CategoryButtonWrap
      onPress={() => {
        navigationRef.current.navigate('SearchMapScreen', {
          screen: 'SearchMapScreen',
          params: {
            keyword: categoryInfo.title,
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
              <Icon
                name={`${categoryInfo.icon}`}
                size={30}
                style={{ marginBottom: 10 }}
              />
              <Font12W500 style={{ textAlign: 'center' }}>
                {categoryInfo.title}
              </Font12W500>
            </View>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </CategoryButtonWrap>
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
