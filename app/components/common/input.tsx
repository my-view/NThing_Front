import React, { useEffect } from 'react';
import styled from '@emotion/native';
import { Font13W400 } from './text';
import { ViewProps } from 'react-native';
import { TextStyle, ViewStyle } from 'react-native/types';
import { theme } from '~/../theme';
import { Icon } from './button';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

export const Input = styled.TextInput`
  padding: 20px;
  border: 1px solid #e1e5ec;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
`;
export const InputLabel = styled(Font13W400)`
  margin-top: 10px;
  color: ${(p) => p.theme.palette.gray03};
  letter-spacing: -0.26px;
`;

export const NT_Input = ({
  value,
  onChangeText,
  placeholder,
  error,
  disabled,
  wrapStyle,
  inputStyle,
  wrapProps,
  inputProps,
}: {
  value: string | undefined;
  placeholder: string;
  onChangeText: ((text: string) => void) | undefined;
  error?: boolean; // error 상태시 색상 변경
  disabled?: boolean; // disabled 상태시 색상 변경
  wrapStyle?: ViewStyle; // wrap 스타일 커스텀
  inputStyle?: ViewStyle; // input 스타일 커스텀
  wrapProps?: ViewProps;
  inputProps?: ViewProps;
}) => {
  const inputWrapStatus = useSharedValue(0);
  const errorIcon = useSharedValue(1);

  const animatedWrapStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        inputWrapStatus.value,
        [0, 1],
        [theme.palette.error, theme.palette.gray01],
      ),
      borderColor: interpolateColor(
        inputWrapStatus.value,
        [0, 1],
        [theme.palette.error, theme.palette.gray01],
      ),
    };
  });

  const errorIconOpacity = useAnimatedStyle(() => {
    return {
      opacity: interpolate(errorIcon.value, [0, 1], [0, 1]),
    };
  });

  const baseWrapStyle: TextStyle = {
    borderWidth: 1,
    borderRadius: 8,
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  };

  const baseInputStyle: TextStyle = {
    flex: 1,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
    marginRight: 3,
    color: theme.palette.black,
  };

  useEffect(() => {
    if (disabled) {
      inputWrapStatus.value = withTiming(1, { duration: 300 });
    } else if (error) {
      inputWrapStatus.value = withTiming(0, { duration: 300 });
      errorIcon.value = withTiming(1, { duration: 300 });
    } else {
      inputWrapStatus.value = withTiming(1, { duration: 300 });
      errorIcon.value = withTiming(0, { duration: 300 });
    }
  }, [error, disabled, errorIcon, inputWrapStatus]);

  return (
    <Animated.View
      style={[baseWrapStyle, animatedWrapStyle, { ...wrapStyle }]}
      {...wrapProps}
    >
      <InputField
        style={[
          baseInputStyle,
          {
            color: disabled ? 'gray' : error ? 'red' : 'black',
          },
          { ...inputStyle },
        ]}
        {...inputProps}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        autoCorrect={false}
        editable={!disabled}
      />
      {disabled
        ? ''
        : error && (
            <Animated.View style={[errorIconOpacity]}>
              <Icon
                // style={[errorIconOpacity]}
                color={theme.palette.error}
                name='S_Caution'
                size={12}
              />
            </Animated.View>
          )}
    </Animated.View>
  );
};

const InputField = styled.TextInput``;
