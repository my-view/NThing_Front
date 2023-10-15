import React, { useState } from 'react';
import styled from '@emotion/native';
import { View, Text, useWindowDimensions } from 'react-native';
import { Font11, Font16W600 } from 'components/common/text';
import { Icon, IconButton } from 'components/common/icon';
import { Row } from 'components/common/layout';
import { Comment as CommentType } from 'types/common';
import { Comment } from 'components/trade/comment';
import { theme } from '~/../theme';

const initialComment = {
  id: 1,
  nickname: '띵띵이',
  content: '',
  is_locked: false,
  created_at: '2023-10-10T18:30:22',
  parent_id: 0,
};

export const Comments = () => {
  const { width } = useWindowDimensions();
  const [newComment, setNewComment] = useState(initialComment);
  const [replyTo, setReplyTo] = useState('');
  const [comments, setComments] = useState<CommentType[]>([]);
  const sendComment = () => {
    if (!newComment.content.trim()) return;
    // 댓글 생성 POST
    setComments((prev) => [...prev, newComment]);
    setNewComment(initialComment);
  };
  return (
    <CommentContainer>
      <View style={{ gap: 20, paddingHorizontal: 20 }}>
        <Font16W600>댓글({comments.length})</Font16W600>
        {comments.length > 0 &&
          comments.map((comment) => (
            <>
              <Comment
                data={comment}
                onPressReply={(parent_id, nickname) => {
                  setNewComment({ ...initialComment, parent_id });
                  setReplyTo(nickname);
                }}
              />
              {comment.replies?.length > 0 && (
                <View style={{ marginLeft: 34, gap: 20 }}>
                  {comment.replies.map((item) => (
                    <Comment
                      data={item}
                      onPressReply={(parent_id, nickname) => {
                        setNewComment({ ...initialComment, parent_id });
                        setReplyTo(nickname);
                      }}
                    />
                  ))}
                </View>
              )}
            </>
          ))}
      </View>
      <View style={{ position: 'relative', padding: 20 }}>
        {replyTo && (
          <ReplyBar style={{ width }}>
            <Font11 style={{ color: theme.palette.gray03 }}>
              <Text style={{ fontWeight: '500' }}>{replyTo}</Text>
              님에게 답글을 남기는 중
            </Font11>
            <IconButton
              onPress={() => {
                setNewComment(initialComment);
                setReplyTo('');
              }}
            >
              <Icon name='S_Close' size={11} color={theme.palette.gray04} />
            </IconButton>
          </ReplyBar>
        )}
        <InputWrapper>
          <CommentInput
            value={newComment.content}
            onChangeText={(v) =>
              setNewComment((prev) => {
                return { ...prev, content: v };
              })
            }
            placeholder='댓글을 입력해주세요'
          />
          <Row style={{ position: 'absolute', right: 10, gap: 8 }}>
            <IconButton
              onPress={() =>
                setNewComment((prev) => {
                  return { ...prev, is_locked: !prev.is_locked };
                })
              }
            >
              <Icon
                name={newComment.is_locked ? 'S_Lock' : 'S_Unlock'}
                size={24}
              />
            </IconButton>
            <IconButton onPress={sendComment}>
              <Icon name='F_Send' size={24} />
            </IconButton>
          </Row>
        </InputWrapper>
      </View>
    </CommentContainer>
  );
};

const CommentContainer = styled.View`
  padding-top: 20px;
  gap: 18px;
`;

const ReplyBar = styled(Row)`
  position: absolute;
  top: -29px;
  height: 29px;
  padding: 0 20px;
  justify-content: space-between;
  background: #f6f7fa;
  border-top-color: #d3d3d3;
  border-top-width: 0.8px;
`;

const InputWrapper = styled(Row)`
  position: relative;
`;

const CommentInput = styled.TextInput`
  width: 100%;
  padding: 14px 72px 14px 14px;
  background-color: ${(p) => p.theme.palette.gray01}4D;
  border-radius: 4px;
  color: ${(p) => p.theme.palette.gray03};
`;
