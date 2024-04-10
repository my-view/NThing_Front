import React, { useRef, useState } from 'react';
import { FlatList, LayoutChangeEvent } from 'react-native';
import { Message } from 'components/chat/message';
import { ChatMessage } from 'types/chat';

export const MessageList: React.FC<{ messages: ChatMessage[] }> = ({
  messages,
}) => {
  const [itemHeights, setItemHeights] = useState<number[]>([]);
  const flatListRef = useRef(null);

  const checkItemHeight = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setItemHeights((prev) => [...prev, height]);
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
          msg.sender_id === prev?.sender_id ||
          (!msg.sender_id && prev && !prev.sender_id);
        return { ...msg, isSameSender };
      })}
      renderItem={(msg) => (
        <Message
          key={msg.item.id}
          checkItemHeight={checkItemHeight}
          data={msg.item}
          isSending={!msg.item.sender_id} // TODO: 나의 id를 알아서 비교해야 함
          isSameSender={msg.item.isSameSender}
          isHost={msg.item.sender_id === 1} // TODO: 호스트 id를 알아서 비교해야 함
        />
      )}
    />
  );
};
