import React from 'react';
import { FlatList } from 'react-native';
import { Message } from 'components/chat/message';
import { IMessage } from 'types/common';

export const MessageList: React.FC<{ messages: IMessage[] }> = ({
  messages,
}) => (
  <FlatList
    contentContainerStyle={{ padding: 20 }}
    data={messages.map((msg, index, arr) => {
      const prev = arr[index - 1];
      const isSameSender =
        msg.user?._id === prev?.user?._id || (!msg.user && prev && !prev.user);
      return { ...msg, isSameSender, key: msg._id };
    })}
    renderItem={(msg) => (
      <Message
        data={msg.item}
        isSending={!msg.item.user}
        isSameSender={msg.item.isSameSender}
        isHost={msg.item.user?._id === 1}
      />
    )}
  />
);
