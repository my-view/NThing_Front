/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { View, Text } from 'react-native';
import {
  Avatar,
  Bubble,
  SystemMessage,
  Message,
  MessageText,
  utils,
} from 'react-native-gifted-chat';
const { isSameUser, isSameDay } = utils;

export const renderAvatar = (props) => (
  <Avatar
    {...props}
    containerStyle={{
      left: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: 'gray',
      },
      right: {},
    }}
    imageStyle={{
      left: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: 'gray',
      },
      right: {},
    }}
  />
);

export const renderBubble = (props) => (
  <Bubble
    {...props}
    renderTime={() => ''}
    // renderTicks={() => <Text>Ticks</Text>}
    containerStyle={{
      left: {
        maxWidth: 192,
        backgroundColor: '#000',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 20,
      },
      right: {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
      },
    }}
    wrapperStyle={{
      left: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#E4E4E4',
        backgroundColor: '#fff',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 20,
      },
      right: {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
      },
    }}
    bottomContainerStyle={{
      left: { backgroundColor: 'white' },
      right: {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
      },
    }}
    tickStyle={{}}
    usernameStyle={{ color: 'tomato', fontWeight: '100' }}
    containerToNextStyle={{
      // left: { borderColor: 'navy', borderWidth: 4 },
      right: {},
    }}
    containerToPreviousStyle={{
      // left: { borderColor: 'mediumorchid', borderWidth: 4 },
      right: {},
    }}
  />
);

export const renderSystemMessage = (props) => (
  <SystemMessage
    {...props}
    containerStyle={{ backgroundColor: 'pink' }}
    wrapperStyle={{ borderWidth: 10, borderColor: 'white' }}
    textStyle={{ color: 'crimson', fontWeight: '900' }}
  />
);

export const renderMessage = (props) => {
  return (
    <View
      style={
        {
          // backgroundColor: 'gray',
          // flexDirection: 'column',
          // borderBottomWidth: 2,
        }
      }
    >
      {isSameUser(props.currentMessage, props.previousMessage) &&
      isSameDay(props.currentMessage, props.previousMessage) ? (
        ''
      ) : (
        <Text>{props.currentMessage.user.name}</Text>
      )}
      <Message
        {...props}
        renderBubble={(props) => (
          <Bubble
            {...props}
            renderTime={() => ''}
            // renderUsernameOnMessage={true}
            renderUsername={() => (
              <Text>123{props.currentMessage.user.name}</Text>
            )}
            // renderTicks={() => <Text>Ticks</Text>}
            containerStyle={{
              left: {
                maxWidth: 192,
                backgroundColor: '#000',
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 20,
              },
              right: {
                borderTopRightRadius: 4,
                borderBottomRightRadius: 20,
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
              },
            }}
            wrapperStyle={{
              left: {
                width: '100%',
                borderWidth: 1,
                borderColor: '#E4E4E4',
                backgroundColor: '#fff',
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 20,
              },
              right: {
                borderTopRightRadius: 4,
                borderBottomRightRadius: 20,
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
              },
            }}
            bottomContainerStyle={{
              left: { backgroundColor: 'white' },
              right: {
                borderTopRightRadius: 4,
                borderBottomRightRadius: 20,
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
              },
            }}
            tickStyle={{}}
            usernameStyle={{ color: 'tomato', fontWeight: '100' }}
            containerToNextStyle={{
              // left: { borderColor: 'navy', borderWidth: 4 },
              right: {},
            }}
            containerToPreviousStyle={{
              // left: { borderColor: 'mediumorchid', borderWidth: 4 },
              right: {},
            }}
          />
        )}
        renderAvatar={(props) => (
          <Avatar
            {...props}
            containerStyle={{
              left: {
                width: 30,
                height: 30,
                borderRadius: 30,
                backgroundColor: 'gray',
              },
              right: {},
            }}
            imageStyle={{
              left: {
                width: 30,
                height: 30,
                borderRadius: 30,
                backgroundColor: 'gray',
              },
              right: {},
            }}
          />
        )}
        // renderDay={() => <Text>Date</Text>}
        containerStyle={
          {
            // left: { backgroundColor: 'red' },
            // right: { backgroundColor: 'blue' },
          }
        }
      />
    </View>
  );
};

export const renderMessageText = (props) => (
  <MessageText
    {...props}
    containerStyle={{
      left: {
        backgroundColor: '#fff',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 20,
        paddingVertical: 11,
        paddingHorizontal: 14,
      },
      right: {
        backgroundColor: '#34C185',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        paddingVertical: 11,
        paddingHorizontal: 14,
      },
    }}
    textStyle={{
      left: { color: 'black' },
      right: { color: 'white' },
    }}
    linkStyle={{
      left: { color: 'black' },
      right: { color: 'white' },
    }}
    customTextStyle={{ fontSize: 15, lineHeight: 20 }}
  />
);

export const renderCustomView = ({ user }) => (
  <View style={{ minHeight: 20, alignItems: 'center' }}>
    <Text>
      Current user:
      {user.name}
    </Text>
    <Text>From CustomView</Text>
  </View>
);
