import React, { useState, useRef, Component } from 'react';
import styled from '@emotion/native';
import { TouchableOpacity, Pressable } from 'react-native';
import { Font13W600 } from 'components/common/text';
import { SvgProps } from 'react-native-svg';
import * as icons from '@assets/image/icon';

export const Button: React.FCC<{ onPress: () => void }> = ({
  onPress,
  children,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
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
  fill = 'black',
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

const Container = styled.View`
  padding: 6px 12px;
  background-color: ${(p) => p.theme.palette.primary};
  border-radius: 4px;
`;

const ButtonTitle = styled(Font13W600)`
  color: ${(p) => p.theme.palette.white};
`;
