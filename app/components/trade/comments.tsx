import React, { useRef, useState } from 'react';
import styled from '@emotion/native';
import { View, Text, useWindowDimensions, TextInput } from 'react-native';
import { Font11, Font16W600 } from 'components/common/text';
import { Icon, IconButton } from 'components/common/icon';
import { Row } from 'components/common/layout';
import { Comment } from 'components/trade/comment';
import { theme } from '~/../theme';
import { usePurchaseComments } from 'hooks/purchase/purchase-comments';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { purchaseQueryKeys } from '~/hooks/purchase/key';

const initialComment = {
  content: '',
  is_private: false,
  parent_id: 0, // 0이면 부모 없음
};

export const Comments: React.FC<{ purchaseId: number }> = ({ purchaseId }) => {
  const getComment = usePurchaseComments(purchaseId);
  const queryClient = useQueryClient();
  const { width } = useWindowDimensions();
  const commentInput = useRef<TextInput>(null);
  const [newComment, setNewComment] = useState(initialComment);
  const [replyTo, setReplyTo] = useState('');
  const comments = getComment.data;

  const sendComment = () => {
    const content = newComment.content.trim();
    if (!content) return;
    axios
      .post('/comment', { ...newComment, purchase_id: purchaseId || null })
      .then(() =>
        queryClient.invalidateQueries({
          queryKey: purchaseQueryKeys.comment(),
          exact: true,
        }),
      );
    setNewComment(initialComment);
    setReplyTo('');
  };

  const reply = (parent_id: number, nickname: string) => {
    setNewComment({ ...initialComment, parent_id });
    setReplyTo(nickname);
    commentInput.current?.focus();
  };

  return (
    <CommentContainer>
      <Font16W600 style={{ paddingHorizontal: 20 }}>
        댓글({comments?.length || 0})
      </Font16W600>
      {!!comments?.length && (
        <View style={{ gap: 24, paddingHorizontal: 20 }}>
          {comments.map((comment) => (
            <View key={comment.id} style={{ gap: 12 }}>
              <Comment data={comment} onPressReply={reply} />
              {comment?.replies &&
                comment.replies.map((item) => (
                  <ReplyCard key={item.id}>
                    <Comment
                      data={{ ...item, parent_id: comment.id }}
                      onPressReply={reply}
                    />
                  </ReplyCard>
                ))}
            </View>
          ))}
        </View>
      )}
      <View style={{ position: 'relative', padding: 20, paddingTop: 10 }}>
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
            ref={commentInput}
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
                  return { ...prev, is_private: !prev.is_private };
                })
              }
            >
              <Icon
                name={newComment.is_private ? 'S_Lock' : 'S_Unlock'}
                size={24}
              />
            </IconButton>
            <IconButton onPress={sendComment}>
              <Icon
                name='F_Send'
                size={24}
                color={
                  newComment.content
                    ? theme.palette.gray06
                    : theme.palette.gray03
                }
              />
            </IconButton>
          </Row>
        </InputWrapper>
      </View>
    </CommentContainer>
  );
};

const CommentContainer = styled.View`
  padding-top: 20px;
  gap: 30px;
`;

const ReplyBar = styled(Row)`
  position: absolute;
  top: -29px;
  height: 29px;
  padding: 0 20px;
  justify-content: space-between;
  background-color: #f6f7f9;
  border-top-color: #e8e8e8;
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

const ReplyCard = styled.View`
  margin-left: 10px;
  padding: 14px 16px 20px;
  background-color: ${(p) => p.theme.palette.gray01}33;
  border-radius: 8px;
`;
