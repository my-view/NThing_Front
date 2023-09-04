/* Local files */
import React, { ReactNode } from 'react';
import { TouchableHighlight } from 'react-native';

interface Props {
  children: ReactNode;
  onPress: () => void;
}

const Button = ({ onPress, children }: Props): JSX.Element => {
  return <TouchableHighlight onPress={onPress}>{children}</TouchableHighlight>;
};

export default Button;
