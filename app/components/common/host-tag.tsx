import React from 'react';
import styled from '@emotion/native';
import { Font11W500 } from 'components/common/text';

export const HostTag = () => (
  <TagWrapper>
    <TagText>작성자</TagText>
  </TagWrapper>
);

const TagWrapper = styled.View`
  padding: 3px 4px;
  background-color: ${(p) => p.theme.palette.gray01};
  border-radius: 2px;
`;

const TagText = styled(Font11W500)`
  color: ${(p) => p.theme.palette.gray04};
`;
