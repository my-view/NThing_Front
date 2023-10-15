import React from 'react';
import styled from '@emotion/native';
import { Pressable } from 'react-native';
import { Comment as CommentType } from 'types/common';
import { Row } from 'components/common/layout';
import {
  Font11W500,
  Font12W500,
  Font13W600,
  Font15W500,
} from 'components/common/text';
import { formatElapsedTime } from 'assets/util/format';

export const Comment: React.FC<{
  data: CommentType;
  onPressReply: (parent_id: number, nickname: string) => void;
}> = ({ data, onPressReply }) => {
  const { nickname, content, parent_id, created_at } = data;
  const imageSize = parent_id ? 24 : 28;
  return (
    <Row style={{ gap: parent_id ? 6 : 8, alignItems: 'flex-start' }}>
      <ProfileImage style={{ width: imageSize, height: imageSize }} />
      <Column>
        <Row style={{ gap: 5, marginBottom: -(imageSize - 13) / 2 }}>
          <Font13W600 style={{ lineHeight: imageSize }}>{nickname}</Font13W600>
          <TagWrapper>
            <TagText>작성자</TagText>
          </TagWrapper>
        </Row>
        <Font15W500>{content}</Font15W500>
        <Row style={{ gap: 8 }}>
          <GraySmallText>
            {formatElapsedTime(created_at || '')} 전
          </GraySmallText>
          {!parent_id && (
            <>
              <GraySmallText>∙</GraySmallText>
              <Pressable onPress={() => onPressReply(parent_id, nickname)}>
                <GraySmallText>답글달기</GraySmallText>
              </Pressable>
            </>
          )}
        </Row>
      </Column>
    </Row>
  );
};

const Column = styled.View`
  gap: 10px;
`;

const ProfileImage = styled.View`
  /* 아래처럼 props로 넘겼을 때 적용이 안됨 */
  /* width: ${(p) => p.size}px;
  height: ${(p) => p.size}px; */
  background-color: ${(p) => p.theme.palette.gray01};
  border-radius: 50px;
`;

const GraySmallText = styled(Font12W500)`
  color: ${(p) => p.theme.palette.gray03};
`;

const TagWrapper = styled.View`
  padding: 3px 4px;
  background-color: ${(p) => p.theme.palette.gray01};
  border-radius: 2px;
`;

const TagText = styled(Font11W500)`
  color: ${(p) => p.theme.palette.gray04};
`;
