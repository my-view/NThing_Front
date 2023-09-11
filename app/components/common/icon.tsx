import React from 'react';
import styled from '@emotion/native';
import { SvgProps } from 'react-native-svg';
import * as icons from '@assets/image/icon/icon';

export type IconName = keyof typeof icons;

type IconProps = SvgProps & {
  name: IconName;
  size?: number;
};

/**
 * name="string"
 * size={number}
 * color로 색상 변경
 */
export function Icon({
  name,
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
  return <Comp {...props} {...sizeProps} />;
}

export const IconButton = styled.Pressable``;
