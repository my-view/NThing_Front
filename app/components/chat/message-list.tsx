import React, { useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { Message } from 'components/chat/message';
import { IMessage } from 'types/chat';

export const MessageList: React.FC<{ messages: IMessage[] }> = ({
  messages,
}) => {
  const [itemHeights, setItemHeights] = useState<number[]>([]);
  const flatListRef = useRef(null);
  const checkItemHeight = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setItemHeights((prev) => {
      return [...prev, height];
    });
  };

  const getItemHeight = (index: number) => {
    if (itemHeights[index] !== undefined) return itemHeights[index];
    return 0;
  };
  const getItemOffset = (index: number) => {
    if (itemHeights[index] === undefined) return 0;
    const data = itemHeights.slice(0, index).reduce((a, c) => a + c, 0);
    return data;
  };
  const getItemLayout = (_: unknown, index: number) => ({
    length: getItemHeight(index),
    offset: getItemOffset(index),
    index,
  });

  return (
    <FlatList
      inverted
      ref={flatListRef}
      getItemLayout={getItemLayout}
      contentContainerStyle={{ padding: 20 }}
      data={messages.map((msg, index, arr) => {
        const prev = arr[index - 1];
        const isSameSender =
          msg.user?._id === prev?.user?._id ||
          (!msg.user && prev && !prev.user);
        return { ...msg, isSameSender, key: msg._id };
      })}
      renderItem={(msg) => (
        <Message
          checkItemHeight={checkItemHeight}
          data={msg.item}
          isSending={!msg.item.user}
          isSameSender={msg.item.isSameSender}
          isHost={msg.item.user?._id === 1}
        />
      )}
    />
  );
};
