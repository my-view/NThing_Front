import React, { useState } from 'react';
import styled from '@emotion/native';
import { Row } from 'components/common/layout';
import {
  Font10W400,
  Font11W600,
  Font12W600,
  Font15W500,
} from 'components/common/text';
import { LayoutChangeEvent, Pressable } from 'react-native';
import { HostTag } from 'components/common/host-tag';
import moment from 'moment';
import { formatKorAmPm } from 'assets/util/format';
import { ChatMessage, WebsocketMessageType } from 'types/chat';
import { MemberControlModal } from 'components/chat/member-control-modal';
import { DateSeparator } from 'components/chat/date-separator';
import { FinishBubble } from 'components/chat/finish-bubble';

export const Message: React.FC<{
  data: ChatMessage;
  isSending: boolean;
  isSameSender: boolean;
  isHost: boolean;
  unreadCount?: number;
  messageType?: 'end' | 'separator';
  checkItemHeight: (event: LayoutChangeEvent) => void;
}> = ({
  data,
  isSending,
  isSameSender,
  isHost,
  unreadCount = 4,
  messageType,
  checkItemHeight,
}) => {
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const isEndBubble = messageType === 'end';
  return (
    <>
      {messageType == 'separator' ? (
        <DateSeparator date={data.timeStamp} />
      ) : (
        <MessageWrapper onLayout={checkItemHeight} isSameSender={isSameSender}>
          {isEndBubble ? (
            <BubbleWrapper isSending={isSending}>
              <FinishBubbleContainer
                isSending={isSending}
                isEndBubble={isEndBubble}
              >
                <FinishBubble isHost={false} disabled={data.buttonDisabled} />
              </FinishBubbleContainer>
              <DetailInfoWrapper isSending={isSending}>
                <SendTime>
                  {`${formatKorAmPm(new Date(data.sent_at))} ${moment(
                    data.sent_at,
                  ).format('h:m')}`}
                </SendTime>
              </DetailInfoWrapper>
            </BubbleWrapper>
          ) : (
            <></>
          )}
          {!isSending && !isSameSender && !isEndBubble && (
            <>
              <Pressable onLongPress={() => setAvatarModalOpen(true)}>
                <AvatarWrapper>
                  <Avatar
                    source={require('../../assets/image/item-example.png')}
                  />
                  <SenderName>{data.user?.name}</SenderName>
                  {isHost && <HostTag />}
                </AvatarWrapper>
              </Pressable>
              {avatarModalOpen && (
                <MemberControlModal
                  isHost={isHost}
                  setOpen={setAvatarModalOpen}
                />
              )}
            </>
          )}

          {!isEndBubble && (
            <BubbleWrapper isSending={isSending}>
              {data.type === WebsocketMessageType.NORMAL && (
                <Bubble isSending={isSending}>
                  <MessageText isSending={isSending}>
                    {data.message}
                  </MessageText>
                </Bubble>
              )}
              <DetailInfoWrapper isSending={isSending}>
                {unreadCount > 0 && <UnreadCount>{unreadCount}</UnreadCount>}
                <SendTime>
                  {`${formatKorAmPm(new Date(data.sent_at))} ${moment(
                    data.sent_at,
                  ).format('h:m')}`}
                </SendTime>
              </DetailInfoWrapper>
            </BubbleWrapper>
          )}
        </MessageWrapper>
      )}
    </>
  );
};

const MessageWrapper = styled.View<{ isSameSender: boolean }>`
  margin-top: ${(p) => (p.isSameSender ? '4px' : '16px')};
  gap: 4px;
`;

const AvatarWrapper = styled(Row)`
  gap: 6px;
`;

const Avatar = styled.Image`
  height: 30px;
  width: 30px;
  border-radius: 30px;
`;

const SenderName = styled(Font12W600)``;

const BubbleWrapper = styled(Row)<{ isSending: boolean }>`
  align-items: flex-end;
  gap: 4px;
  ${(p) => p.isSending && 'flex-direction: row-reverse;'}
`;

const Bubble = styled.View<{ isSending: boolean }>`
  max-width: 192px;
  align-self: ${(p) => (p.isSending ? 'flex-end' : 'flex-start')};
  padding: 11px 14px;
  background-color: ${(p) =>
    p.isSending ? p.theme.palette.primary : p.theme.palette.white};
  border-radius: 20px;
  ${(p) =>
    p.isSending
      ? 'border-bottom-right-radius: 4px;'
      : 'border-top-left-radius: 4px;'}
  ${(p) =>
    !p.isSending &&
    'border-color: #e4e4e4; border-width: 1px; margin-left: 36px;'}
`;
const FinishBubbleContainer = styled.View<{
  isSending: boolean;
  isEndBubble: boolean;
}>`
  max-width: 260px;
  align-self: flex-start;
  padding: 20px 16px;
  background-color: ${(p) => p.theme.palette.white};
  border-radius: 20px;

  border-color: #e4e4e4;
  border-width: 1px;
  margin-left: 0px;
`;

const MessageText = styled(Font15W500)<{ isSending: boolean }>`
  line-height: 20px;
  color: ${(p) =>
    p.isSending ? p.theme.palette.white : p.theme.palette.black};
`;

const SendTime = styled(Font10W400)`
  color: ${(p) => p.theme.palette.gray03};
  line-height: 12px;
`;

const UnreadCount = styled(Font11W600)`
  color: ${(p) => p.theme.palette.primary};
  line-height: 12px;
`;

const DetailInfoWrapper = styled.View<{ isSending: boolean }>`
  gap: 2px;
  ${(p) => p.isSending && 'align-items: flex-end;'}
`;
