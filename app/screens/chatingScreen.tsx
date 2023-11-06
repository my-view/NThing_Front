import React, { useState, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { CustomHeader } from 'components/common/header';
import initialMessages from 'assets/mock/messages';
import { InpuptToolbar } from 'components/chat/input-toolbar';
import { MessageList } from 'components/chat/message-list';
import { IMessage } from 'types/common';

const ChatingScreen = ({ navigation }: any) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);

  const onSend = (newMessages: IMessage) => {
    setMessages((prev) => [...prev, newMessages]);
  };

  useEffect(() => setMessages(initialMessages.reverse()), []);

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
      <InpuptToolbar
        value={input}
        onChange={(text) => setInput(text)}
        onSend={(msg) => onSend(msg)}
      />
    </SafeAreaView>
  );
};

export default ChatingScreen;
