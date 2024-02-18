import React, { useState } from 'react';
import styled from '@emotion/native';
import { Row } from 'components/common/layout';
import {
  Font10W400,
  Font10W500,
  Font11W600,
  Font12W600,
  Font15W500,
} from 'components/common/text';
import { Pressable, Text, View } from 'react-native';
import { HostTag } from 'components/common/host-tag';
import moment from 'moment';
import { formatKorAmPm } from 'assets/util/format';
import { IMessage } from 'types/common';
import { MemeberControlModal } from './member-control-modal';
import { Divider } from '../common/divider';
import { theme } from '~/../theme';
import { DateSeparator } from './date-separator';
import { FinishBubble } from './finish-bubble';

export const Message: React.FC<{
  data: IMessage;
  isSending: boolean;
  isSameSender: boolean;
  isHost: boolean;
  unreadCount?: number;
  checkItemHeight: any;
}> = ({
  data,
  isSending,
  isSameSender,
  isHost,
  unreadCount = 4,
  checkItemHeight,
}) => {
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);

  const isEndBubble = data.type == 'end' ? true : false;
  console.log('data', data);
  return (
    <>
      {data.type == 'separator' ? (
        <DateSeparator date={data.timeStamp} />
      ) : (
        <MessageWrapper onLayout={checkItemHeight} isSameSender={isSameSender}>
          {data.type == 'end' ? (
            <BubbleWrapper isSending={isSending}>
              <FinishBubbleContainer
                isSending={isSending}
                isEndBubble={isEndBubble}
              >
                <FinishBubble isHost={false} />
              </FinishBubbleContainer>
              <DetailInfoWrapper isSending={isSending}>
                <SendTime>
                  {`${formatKorAmPm(new Date(data.createdAt))} ${moment(
                    data.createdAt,
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
                <MemeberControlModal
                  isHost={isHost}
                  setOpen={setAvatarModalOpen}
                />
              )}
            </>
          )}

          {!isEndBubble && (
            <BubbleWrapper isSending={isSending}>
              <Bubble isSending={isSending}>
                <MessageText isSending={isSending}>{data.text}</MessageText>
              </Bubble>
              <DetailInfoWrapper isSending={isSending}>
                {unreadCount > 0 && <UnreadCount>{unreadCount}</UnreadCount>}
                <SendTime>
                  {`${formatKorAmPm(new Date(data.createdAt))} ${moment(
                    data.createdAt,
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
