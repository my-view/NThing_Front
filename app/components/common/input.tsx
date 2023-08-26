import styled from '@emotion/native';
import { Font13W400 } from './text';
export const Input = styled.TextInput`
  padding: 20px;
  border: 1px solid #e1e5ec;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
`;
export const InputLabel = styled(Font13W400)`
  margin-top: 10px;
  color: ${(p) => p.theme.palette.gray03};
  letter-spacing: -0.26px;
`;

// 한글, 영어, 숫자만 사용할 수 있어요. (최대 12자)
