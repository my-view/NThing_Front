import React, { useState } from 'react';
import styled from '@emotion/native';
import {
  ActivityIndicator,
  Pressable,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Font12W500, Font13W600, Font16W600 } from 'components/common/text';
import {
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { usePressableAnimated } from '~/hooks/animated/usePressableAnimated';
import { navigationRef } from '~/../RootNavigation';

import { SvgCssUri } from 'react-native-svg';
import { theme } from '~/../theme';
import { useFetchCategoryList } from 'hooks/category';

export enum BtnSize {
  SMALL = '6px 12px',
  MEDIUM = '11.5px 18px',
}

export enum BtnType {
  PRIMARY = 'primary',
  DISABLED = 'disabled',
}

const BtnTypeMapping = {
  [BtnType.PRIMARY]: {
    backgroundColor: theme.palette.primary,
    color: theme.palette.white,
  },
  [BtnType.DISABLED]: {
    backgroundColor: theme.palette.gray01,
    color: theme.palette.white,
  },
};

export const Button: React.FCC<{
  onPress: () => void;
  size?: BtnSize;
  variant?: BtnType;
}> = ({
  onPress,
  size = BtnSize.MEDIUM,
  variant = BtnType.PRIMARY,
  children,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Container size={size} variant={variant}>
        <ButtonTitle variant={variant}>{children}</ButtonTitle>
      </Container>
    </Pressable>
  );
};

const Container = styled.View<{ size: BtnSize; variant: BtnType }>`
  padding: ${(p) => p.size};
  align-items: center;
  background-color: ${(p) => BtnTypeMapping[p.variant].backgroundColor};
  border-radius: 4px;
`;

const ButtonTitle = styled(Font13W600)<{ variant: BtnType }>`
  color: ${(p) => BtnTypeMapping[p.variant].color};
`;

type RoundedButtonType = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export const RoundedButton = ({
  title,
  onPress,
  disabled,
  style,
  textStyle,
}: RoundedButtonType) => {
  const DefaultButtonStyle: ViewStyle = {
    width: '100%',
    paddingVertical: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34C185',
    ...style,
  };
  const DefaultTextStyle: TextStyle = {
    textAlign: 'center',
    fontWeight: '500',
    color: 'white',
    ...textStyle,
  };

  const DisabledButtonStyle = {
    ...DefaultButtonStyle,
    backgroundColor: '#E1E5EC',
  };

  const DisabledTextStyle = {
    ...DefaultTextStyle,
    color: 'white',
  };

  return (
    <Pressable
      disabled={disabled}
      style={disabled ? DisabledButtonStyle : DefaultButtonStyle}
      onPress={onPress}
    >
      <Font16W600 style={disabled ? DisabledTextStyle : DefaultTextStyle}>
        {title}
      </Font16W600>
    </Pressable>
  );
};

export const CategoryIconButton: React.FC = () => {
  const { data: categoryData } = useFetchCategoryList();
  const [loading, setLoading] = useState(true);

  const onError = (e: Error) => {
    console.log(e.message);
    setLoading(false);
  };
  const onLoad = () => {
    console.log('Svg loaded!');
    setLoading(false);
  };

  const { pan, animatedStyles } = usePressableAnimated();

  return (
    <>
      {categoryData?.map((el) => (
        <CategoryButtonWrap
          key={`${el.id}`}
          onPress={() => {
            navigationRef.current.navigate('SearchMapScreen', {
              keyword: el.name,
              isCategory: true,
            });
          }}
        >
          <GestureHandlerRootView>
            <GestureDetector gesture={pan}>
              <Animated.View style={[animatedStyles]}>
                <View style={{ justifyContent: 'center', gap: 10 }}>
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
