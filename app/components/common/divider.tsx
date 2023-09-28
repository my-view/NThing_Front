import React from 'react';
import styled from '@emotion/native';
export enum DotSize {
  SMALL = '2px',
  MEDIUM = '4px',
  LARGE = '6px',
}

export const Divider = styled.View`
  border-bottom-width: 1px;/
  border-bottom-color: ${(p) => p.theme.palette.gray01};
`;

export const MiddleDot: React.FCC<{ size?: DotSize }> = ({
  size = DotSize.MEDIUM,
}) => {
  return <MiddleDotStyleView size={size} />;
};

const MiddleDotStyleView = styled.View<{ size: DotSize }>`
  width: ${(p) => p.size};
  height: ${(p) => p.size};
  background-color: #8f95a2;
  border-radius: 10px;
`;
