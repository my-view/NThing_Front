import styled from '@emotion/native';
import { Row } from 'components/common/layout';
import { getWidthRatio } from 'assets/util/layout';

export const Header = styled(Row)`
  height: 56px;
  padding: 10px ${getWidthRatio(20)};
  justify-content: space-between;
  background-color: ${(p) => p.theme.palette.white};
  border-bottom-width: 1px;
  border-bottom-color: ${(p) => p.theme.palette.gray01};
`;
