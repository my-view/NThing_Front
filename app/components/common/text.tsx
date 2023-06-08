import styled from '@emotion/native';
import {theme} from '../../../theme';

const Font16W500 = styled.Text`
  /* font-family: 'Pretendard'; */
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
`;

const UnderLine14 = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  color: ${theme.palette.gray03};
  text-decoration-line: underline;
`;

export {Font16W500, UnderLine14};
