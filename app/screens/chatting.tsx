import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View } from 'react-native';
import { CustomHeader } from 'components/common/header';
import initialMessages from 'assets/mock/messages';
import { InputToolbar } from 'components/chat/input-toolbar';
import { MessageList } from 'components/chat/message-list';
import { IMessage } from 'types/chat';
import { CompatClient, Frame, Stomp } from '@stomp/stompjs';
import { TOKEN_STORAGE_KEY, WEBSOCKET_SERVER_URL } from 'assets/util/constants';
import { getStorage } from 'assets/util/storage';

const ChattingScreen = ({ navigation }: any) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const client = useRef<CompatClient>();
  const roomId = 1;

  const connect = async () => {
    const token = await getStorage(TOKEN_STORAGE_KEY);
    client.current = Stomp.over(() => {
      const socket = new WebSocket(`${WEBSOCKET_SERVER_URL}/ws-stomp`);
      return socket;
    });
    console.log('token  ' + token);
    client.current.connect(
      { Authorization: `Bearer ${token}` },
      (frame: Frame) => {
        console.log('hi, connected', frame.body);
        client.current?.subscribe(`/room/${roomId}`, (message) => {
          console.log(JSON.parse(message.body));
          // setMessage(JSON.parse(message.body));
        });
      },
    );
  };

  const send = (message: IMessage) => {
    client.current?.send(
      `/send/${roomId}`,
      {},
      JSON.stringify({ message: message.text }),
    );
  };

  const onSend = (newMessages: IMessage) => {
    send(newMessages);
    setMessages((prev) => [newMessages, ...prev]);
    setInput('');
  };

  useEffect(() => {
    connect();
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
