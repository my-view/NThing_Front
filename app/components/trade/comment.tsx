import React from 'react';
import styled from '@emotion/native';
import { Pressable } from 'react-native';
import { Comment as CommentType } from 'types/common';
import { Row } from 'components/common/layout';
import { Font12W500, Font13W600, Font15W500 } from 'components/common/text';
import { formatElapsedTime } from 'assets/util/format';
import { Icon } from 'components/common/icon';
import { HostTag } from 'components/common/host-tag';

export const Comment: React.FC<{
  data: CommentType;
  onPressReply: (parent_id: number, nickname: string) => void;
}> = ({ data, onPressReply }) => {
  const { id, nickname, content, parent_id, created_at, is_private } = data;
  return (
    <Row style={{ gap: parent_id ? 6 : 8, alignItems: 'flex-start' }}>
      <ProfileImage />
      <Column style={{ flex: 1 }}>
        <Row style={{ gap: 5, marginBottom: -7.5 }}>
          <Font13W600 style={{ lineHeight: 28 }}>{nickname}</Font13W600>
          <HostTag />
          {is_private && <Icon name='S_Lock' size={18} />}
        </Row>
        <Font15W500>{content}</Font15W500>
        <Row style={{ gap: 8 }}>
          <GraySmallText>
            {formatElapsedTime(created_at || '')} 전
          </GraySmallText>
          <GraySmallText>∙</GraySmallText>
          <Pressable onPress={() => onPressReply(parent_id || id, nickname)}>
            <GraySmallText>답글달기</GraySmallText>
          </Pressable>
        </Row>
      </Column>
    </Row>
  );
};

const Column = styled.View`
  gap: 10px;
`;

const ProfileImage = styled.View`
  width: 28px;
  height: 28px;
  background-color: ${(p) => p.theme.palette.gray01};
  border-radius: 50px;
`;

const GraySmallText = styled(Font12W500)`
  color: ${(p) => p.theme.palette.gray03};
`;
