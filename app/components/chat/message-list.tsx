import React from 'react';
import { ScrollView } from 'react-native';
import { Message } from 'components/chat/message';
import { IMessage } from 'types/common';

export const MessageList: React.FC<{ messages: IMessage[] }> = ({
  messages,
}) => (
  <ScrollView style={{ flex: 1, padding: 20 }}>
    {messages.map((msg, index, arr) => {
      const prev = arr[index - 1];
      const isSameSender =
        msg.user?._id === prev?.user?._id || (!msg.user && prev && !prev.user);
      return (
        <Message
          key={msg._id}
          data={msg}
          isSending={!msg.user}
          isSameSender={isSameSender}
          isHost={msg.user?._id === 1}
        />
      );
    })}
  </ScrollView>
);
