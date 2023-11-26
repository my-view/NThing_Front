/* Local files */
import React, { ReactNode } from 'react';
import { BaseText } from '@components/common/text';

interface Props {
  children: ReactNode;
  onPress: () => void;
}

const NT_Text = ({ onPress, children }: Props): JSX.Element => {
  return <BaseText>{children}</BaseText>;
};

export default NT_Text;
