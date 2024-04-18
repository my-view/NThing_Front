import React, { useState, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { CustomHeader } from 'components/common/header';
import initialMessages from 'assets/mock/messages';
import { InputToolbar } from 'components/chat/input-toolbar';
import { MessageList } from 'components/chat/message-list';
import { ChatMessage } from 'types/chat';
import { send, stompClient } from 'assets/util/web-socket';

const ChattingScreen = ({ navigation }: any) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const roomId = 1;

  const onSend = (newMessage: string) => {
    send(roomId, newMessage);
    setInput('');
  };

  useEffect(() => {
    const sortDate = initialMessages
      .sort(
        (a, b) => new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime(),
      )
      .reverse();
    setMessages(sortDate);
  }, []);

  // useEffect(() => {
  // stompClient.subscribe(`/room/${roomId}`, (message) => {
  //   console.log('hi' + JSON.parse(message.body));
  // TODO: 메시지 받아서 처리
  // setMessage(JSON.parse(message.body));
  //   });
  // }, [roomId]);

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
