import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView, View, ImageStyle, StyleSheet, Text } from 'react-native';
import { CustomHeader } from 'components/common/header';
import { GiftedChat, GiftedAvatar, Bubble } from 'react-native-gifted-chat';
import { formatKorDate } from '~/assets/util/format';
import { Font10W400, Font11W600, Font15W500 } from '~/components/common/text';
import { theme } from '~/../theme';

interface Reply {
  title: string;
  value: string;
  messageId?: any;
}

interface QuickReplies {
  type: 'radio' | 'checkbox';
  values: Reply[];
  keepIt?: boolean;
}

interface User {
  _id?: string | number;
  name?: string;
  avatar?: string;
}

export interface IMessage {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: User;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
  quickReplies?: QuickReplies;
}
const ChatingScreen = ({ navigation }: any) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  console.log('messages-------', messages);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT',
        createdAt: new Date(),
        sent: true,
        user: {
          _id: 31232,
          name: 'React Native',
        },
      },
      {
        _id: 2,
        text: 'This is a quick reply. Do you love Gifted Chat? (checkbox)',
        createdAt: new Date(),
        sent: true,
        user: {
          _id: 31232,
          name: 'React Native',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const styles = {
    left: StyleSheet.create({
      container: {
        marginRight: 8,
      },
      onTop: {
        alignSelf: 'flex-start',
      },
      onBottom: {},
      image: {
        height: 36,
        width: 36,
        borderRadius: 18,
      },
    }),
    right: StyleSheet.create({
      container: {
        marginLeft: 8,
      },
      onTop: {
        alignSelf: 'flex-start',
      },
      onBottom: {},
      image: {
        height: 36,
        width: 36,
        borderRadius: 18,
      },
    }),
  };

  const formatCreateAt = (date: Date | string) => {
    const convertCreateDate = formatKorDate(date).split(' ');
    const anteMeridiem = convertCreateDate[1];
    const hour = convertCreateDate[2];
    const min = convertCreateDate[3];
    console.log('convertCreateDate', convertCreateDate);
    return `${anteMeridiem} ${hour} ${min}`;
  };

  const renderBubble = (props) => {
    const {
      currentMessage: { text: currText },
    } = props;
    // if (currText.indexOf('[x]') === -1) {
    //   return <Bubble {...props} />;
    // }
    console.log('renderBubble---', props);

    return (
      <Bubble
        renderUsername={(props) => {
          return <Text>{props.currentMessage.user.name}</Text>;
        }}
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#fff',
            maxWidth: 192,
            borderWidth: 1,
            borderColor: '#E4E4E4',
            paddingHorizontal: 14,
            paddingVertical: 11,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          },
          right: {
            paddingHorizontal: 14,
            paddingVertical: 11,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 4,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            backgroundColor: theme.palette.primary,
          },
        }}
        timeTextStyle={{
          left: {
            color: '#000',
          },
          right: {
            color: '#000',
          },
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <CustomHeader
        title='타코야끼 같이 시켜먹으실 분 구해요~ (4/4)'
        subTitle='서울대학교 인문대학'
        image='../../assets/image/item-example.png'
        // useLeftButton={false}
        navigation={navigation}
        bottomBorder={true}
        // renderRightButton={() => {
        //   return (
        //     <Pressable onPress={() => console.log('123')}>
        //       <Text>rightButton</Text>
        //     </Pressable>
        //   );
        // }}
      />

      <View
        style={{
          flex: 1,
        }}
      >
        <GiftedChat
          showAvatarForEveryMessage={false}
          renderAvatarOnTop={true}
          messages={messages}
          user={{
            _id: 0,
          }}
          onSend={(messages) => onSend(messages)}
          // renderSystemMessage={(prop) => {
          //   console.log('--renderBubble--', prop);
          //   return (
          //     <View
          //       style={{
          //         marginBottom: 4,
          //         flexDirection: 'row',
          //         alignItems: 'flex-end',
          //       }}
          //     >
          //       <View
          //         style={{
          //           maxWidth: 192,
          //           borderWidth: 1,
          //           borderColor: '#E4E4E4',
          //           paddingHorizontal: 14,
          //           paddingVertical: 11,
          //           borderTopLeftRadius: 4,
          //           borderTopRightRadius: 20,
          //           borderBottomRightRadius: 20,
          //           borderBottomLeftRadius: 20,
          //         }}
          //       >
          //         <Font15W500
          //           style={{
          //             lineHeight: 15,
          //           }}
          //         >
          //           {prop.currentMessage?.text}
          //         </Font15W500>
          //       </View>
          //       <View
          //         style={{
          //           gap: 2,
          //           marginLeft: 4,
          //         }}
          //       >
          //         <Font11W600
          //           style={{
          //             lineHeight: 12,
          //             color: theme.palette.primary,
          //           }}
          //         >
          //           {3}
          //         </Font11W600>
          //         <Font10W400
          //           style={{
          //             lineHeight: 12,
          //             color: theme.palette.gray03,
          //           }}
          //         >
          //           {formatCreateAt(prop.currentMessage?.createdAt)}
          //         </Font10W400>
          //       </View>
          //     </View>
          //   );
          // }}
          // renderBubble={(prop) => {
          //   console.log('--renderBubble--', prop);
          //   return (
          //     <View
          //       style={{
          //         marginBottom: 4,
          //         flexDirection: 'row',
          //         alignItems: 'flex-end',
          //       }}
          //     >
          //       <View
          //         style={{
          //           maxWidth: 192,
          //           borderWidth: 1,
          //           borderColor: '#E4E4E4',
          //           paddingHorizontal: 14,
          //           paddingVertical: 11,
          //           borderTopLeftRadius: 4,
          //           borderTopRightRadius: 20,
          //           borderBottomRightRadius: 20,
          //           borderBottomLeftRadius: 20,
          //         }}
          //       >
          //         <Font15W500
          //           style={{
          //             lineHeight: 15,
          //           }}
          //         >
          //           {prop.currentMessage?.text}
          //         </Font15W500>
          //       </View>
          //       <View
          //         style={{
          //           gap: 2,
          //           marginLeft: 4,
          //         }}
          //       >
          //         <Font11W600
          //           style={{
          //             lineHeight: 12,
          //             color: theme.palette.primary,
          //           }}
          //         >
          //           {3}
          //         </Font11W600>
          //         <Font10W400
          //           style={{
          //             lineHeight: 12,
          //             color: theme.palette.gray03,
          //           }}
          //         >
          //           {formatCreateAt(prop.currentMessage?.createdAt)}
          //         </Font10W400>
          //       </View>
          //     </View>
          //   );
          // }}
          renderBubble={renderBubble}
          // renderUsername={(prop) => {
          //   console.log('--renderUsername--', prop);

          //   return (
          //     <View>
          //       <Text>32</Text>
          //     </View>
          //   );
          // }}
          // renderCustomView={(prop) => {
          //   console.log('--renderCustomView--', prop);

          //   return (
          //     <View>
          //       <Text>123</Text>
          //     </View>
          //   );
          // }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatingScreen;
