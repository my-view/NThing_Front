import React from 'react';
import styled from '@emotion/native';
import { TouchableOpacity, Pressable } from 'react-native';
import { Font13W600, Font16W600 } from 'components/common/text';
import { SvgProps } from 'react-native-svg';
import * as icons from '@assets/image/icon';

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
    <TouchableOpacity onPress={onPress}>
      <Container size={size}>
        <ButtonTitle>{children}</ButtonTitle>
      </Container>
    </TouchableOpacity>
  );
};

type IconProps = SvgProps & {
  name: keyof typeof icons;
  size?: number;
};

export function Icon({
  name,
  fill = 'transparent',
  width: _width,
  height: _height,
  size,
  ...props
}: IconProps) {
  const Comp = icons[name];
  const width = _width ?? size;
  const height = _height ?? size;
  const sizeProps = {
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  };

  return <Comp {...props} fill={fill} {...sizeProps} />;
}

export const IconButton = styled.Pressable``;

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
