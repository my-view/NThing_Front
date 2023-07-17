import React from 'react';
import styled from '@emotion/native';
import { TouchableOpacity } from 'react-native';
import { Font13W600 } from 'components/common/text';

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

const Container = styled.View`
  padding: 6px 12px;
  background-color: ${(p) => p.theme.palette.primary};
  border-radius: 4px;
`;

const ButtonTitle = styled(Font13W600)`
  color: ${(p) => p.theme.palette.white};
`;
