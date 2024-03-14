import React, { useState, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { CustomHeader } from 'components/common/header';
import initialMessages from 'assets/mock/messages';
import { InputToolbar } from 'components/chat/input-toolbar';
import { MessageList } from 'components/chat/message-list';
import { IMessage } from 'types/chat';

const ChattingScreen = ({ navigation }: any) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);

  const onSend = (newMessages: IMessage) => {
    setMessages((prev) => [newMessages, ...prev]);
    setInput('');
  };

  useEffect(() => {
    const sortDate = initialMessages
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      .reverse();
    setMessages(sortDate); // TODO: mock messages에서 text property가 없는 특수 type의 메시지들 때문에 타입이 맞지 않아 에러 발생
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <CustomHeader
        title='타코야끼 같이 시켜먹으실 분 구해요~ (4/4)'
        subTitle='서울대학교 인문대학'
        image='../../assets/image/item-example.png'
        navigation={navigation}
        bottomBorder={true}
      />
      <View style={{ flex: 1 }}>
        <MessageList messages={messages} />
      </View>
      <InputToolbar
        value={input}
        onChange={(text) => setInput(text)}
        onSend={(msg) => onSend(msg)}
      />
    </SafeAreaView>
  );
};

export default ChattingScreen;
