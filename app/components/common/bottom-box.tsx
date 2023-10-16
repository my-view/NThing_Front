import React from 'react';
import styled from '@emotion/native';
import { Shadow } from 'react-native-shadow-2';
import { Row } from 'components/common/layout';

export const ShadowBottom: React.FCC = ({ children }) => (
  <BottomBox>
    <Shadow style={{ width: '100%' }} startColor='rgba(0, 0, 0, 0.05)'>
      <Content>{children}</Content>
    </Shadow>
  </BottomBox>
);

const BottomBox = styled.View`
  position: absolute;
  bottom: 0px;
  width: 100%;
`;

const Content = styled(Row)`
  justify-content: space-between;
  padding: 12px 20px 32px;
  background-color: ${(p) => p.theme.palette.white};
`;
