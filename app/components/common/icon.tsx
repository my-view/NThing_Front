import React from 'react';
import styled from '@emotion/native';
import { SvgProps, SvgXml } from 'react-native-svg';
import * as icons from '@assets/image/icon/icon';
import { Animated } from 'react-native';

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

interface AnimatedIconProps {
  color: string;
  xml: string;
  size: number;
}

class ClassIcon extends React.Component<AnimatedIconProps> {
  render() {
    return (
      <SvgXml
        xml={this.props.xml}
        width={this.props.size}
        height={this.props.size}
        color={this.props.color}
      />
    );
  }
}

export const AnimatedIcon = Animated.createAnimatedComponent(ClassIcon);
