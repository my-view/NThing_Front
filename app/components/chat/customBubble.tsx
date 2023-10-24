import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {
  MessageText,
  MessageImage,
  Time,
  Avatar,
  Day,
  utils,
} from 'react-native-gifted-chat';

const { isSameUser, isSameDay } = utils;

export const NT_Messages = (props) => {
  //   const getInnerComponentProps = () => {
  //     const { containerStyle, ...componentProps } = props;
  //     return {
  //       ...componentProps,
  //       //   position: 'left',
  //       isSameUser,
  //       isSameDay,
  //     };
  //   };
  const renderMessageText = () => {
    const {
      containerStyle,
      wrapperStyle,
      messageTextStyle,
      ...messageTextProps
    } = props;
    if (props.currentMessage.text) {
      if (props.renderMessageText) {
        return props.renderMessageText(messageTextProps);
      }
      console.log('props.wrapperStyle', containerStyle);
      return (
        <MessageText
          {...messageTextProps}
          //   position='right'/
          containerStyle={{
            left: [{ backgroundColor: '#FFF' }],
            right: [{ backgroundColor: '#34C185' }],
          }}
          textStyle={{
            left: [
              //   styles.standardFont,
              //   styles.slackMessageText,
              messageTextProps.textStyle,
              messageTextStyle,
              { maxWidth: 197, marginLeft: 0, marginRight: 0 },
            ],
            right: [{ maxWidth: 197, marginLeft: 0, marginRight: 0 }],
          }}
        />
      );
    }
    return null;
  };

  const renderMessageImage = () => {
    if (props.currentMessage.image) {
      const { containerStyle, wrapperStyle, ...messageImageProps } = props;
      if (props.renderMessageImage) {
        return props.renderMessageImage(messageImageProps);
      }
      return (
        <MessageImage
          {...messageImageProps}
          imageStyle={[styles.slackImage, messageImageProps.imageStyle]}
        />
      );
    }
    return null;
  };

  const renderUsername = () => {
    const username = props.currentMessage.user.name;
    if (username) {
      if (props.renderUsername) {
        return props.renderUsername(usernameProps);
      }
      return (
        <Text
          style={[
            // styles.standardFont,
            // styles.headerItem,
            // styles.username,
            props.usernameStyle,
          ]}
        >
          {username}
        </Text>
      );
    }
    return null;
  };
  const renderWriterTag = () => {
    const username = props.currentMessage.user.name;
    if (username) {
      if (props.renderUsername) {
        return props.renderUsername(usernameProps);
      }
      return (
        <View
          style={{
            backgroundColor: '#E1E5EC',
            borderRadius: 2,
            paddingVertical: 3,
            paddingHorizontal: 4,
            width: 37,
            height: 17,
          }}
        >
          <Text
            style={[
              {
                color: '#5A5F70',
                padding: 0,
                margin: 0,
                fontSize: 11,
                lineHeight: 11,
              },
              { backgroundColor: '#E1E5EC', borderRadius: 2 },
            ]}
          >
            작성자
          </Text>
        </View>
      );
    }
    return null;
  };

  const renderTime = () => {
    if (props.currentMessage.createdAt) {
      const { containerStyle, wrapperStyle, ...timeProps } = props;
      if (props.renderTime) {
        return props.renderTime(timeProps);
      }
      return (
        <Time
          {...timeProps}
          //   containerStyle={{ left: [styles.timeContainer] }}
          textStyle={{
            left: [
              //   styles.standardFont,
              //   styles.headerItem,
              //   styles.time,
              timeProps.textStyle,
            ],
            right: [timeProps.textStyle],
          }}
        />
      );
    }
    return null;
  };
  const renderAvatar = () => {
    let extraStyle;
    if (
      isSameUser(props.currentMessage, props.previousMessage) &&
      isSameDay(props.currentMessage, props.previousMessage)
    ) {
      // Set the invisible avatar height to 0, but keep the width, padding, etc.
      extraStyle = { height: 0 };
    }

    // const avatarProps = getInnerComponentProps();
    return (
      <Avatar
        // {...avatarProps}
        imageStyle={{
          left: [
            { width: 30, height: 30, borderRadius: 30 },
            // avatarProps.imageStyle,
            extraStyle,
          ],
        }}
      />
    );
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        {renderAvatar()}
        <View>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            {renderUsername()}
            {renderWriterTag()}
          </View>
          {renderMessageText()}
        </View>
      </View>
      {renderTime()}
    </View>
  );
};
