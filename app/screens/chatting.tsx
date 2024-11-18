import React, { useState, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { CustomHeader } from 'components/common/header';
import initialMessages from 'assets/mock/messages';
import { InputToolbar } from 'components/chat/input-toolbar';
import { MessageList } from 'components/chat/message-list';
import { ChatMessage, WebsocketMessageType } from 'types/chat';
import { send, stompClient } from 'assets/util/web-socket';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'screens/stack';

type Props = NativeStackScreenProps<RootStackParamList, 'ChattingScreen'>;

const ChattingScreen = ({ navigation, route }: Props) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const roomId = route.params.id;
  console.log(roomId);
  const onSend = (msg: string) => {
    send(roomId, { type: WebsocketMessageType.NORMAL, content: msg });
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
  //   stompClient.subscribe(`/room/${roomId}`, (message) => {
  //     const newMessage = JSON.parse(message.body);
  //     console.log('hi' + JSON.parse(message.body));
  //     // TODO: 메시지 받아서 처리

  //     // setMessages((prev) => [...prev, newMessage]);
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
