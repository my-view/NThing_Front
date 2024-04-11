import { ChatMessage, WebsocketMessageType } from 'types/chat';

const messages: ChatMessage[] = [
  {
    id: 1,
    type: WebsocketMessageType.NORMAL,
    message: 'This is a system message',
    sent_at: '2024-04-11 18:32:33',
    sender_id: 2,
    chat_room_id: 2,
  },
  {
    id: 2,
    type: WebsocketMessageType.NORMAL,
    message: 'Hello developer',
    sent_at: '2024-04-11 18:32:33',
    sender_id: 2,
    chat_room_id: 2,
    // user: {
    //   id: 2,
    //   name: 'React Native',
    //   avatar: 'https://placeimg.com/140/140/any',
    // },
  },
  {
    id: 3,
    type: WebsocketMessageType.NORMAL,
    message: 'Hi! I work from home today!',
    sent_at: '2024-04-11 18:32:33',
    sender_id: 2,
    chat_room_id: 2,
    // user: {
    //   id: 1,
    //   name: 'React Native',
    //   avatar: 'https://placeimg.com/140/140/any',
    // },
    // image: 'https://placeimg.com/960/540/any',
  },
  {
    id: 4,
    type: WebsocketMessageType.NORMAL,
    message: 'This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT',
    sent_at: '2024-04-11 18:32:33',
    sender_id: 2,
    chat_room_id: 2,
    // user: {
    //   id: 2,
    //   name: 'React Native',
    //   avatar: 'https://placeimg.com/140/140/any',
    // },
  },
  {
    id: 5,
    type: WebsocketMessageType.NORMAL,
    message: 'This is a quick reply. Do you love Gifted Chat? (checkbox)',
    sent_at: '2024-04-11 18:32:33',
    sender_id: 2,
    chat_room_id: 2,
    // user: {
    //   id: 2,
    //   name: 'React Native',
    //   avatar: 'https://placeimg.com/140/140/any',
    // },
  },
  {
    id: 6,
    type: WebsocketMessageType.NORMAL,
    message: 'Come on!',
    sent_at: '2024-04-11 18:32:33',
    sender_id: 2,
    chat_room_id: 2,
    // user: {
    //   id: 2,
    //   name: 'React Native',
    //   avatar: 'https://placeimg.com/140/140/any',
    // },
  },
  {
    id: 7,
    type: WebsocketMessageType.NORMAL,
    message: `Hello this is an example of the Parsedmessage, links like http://www.google.com or http://www.facebook.com are clickable and phone number 444-555-6666 can call too.
          But you can also do more with this package, for example Bob will change style and David too. foo@gmail.com
          And the magic number is 42!
          #react #react-native`,
    sent_at: '2024-04-11 18:32:33',
    sender_id: 2,
    chat_room_id: 2,
    // user: {
    //   id: 1,
    //   name: 'React Native',
    //   avatar: 'https://placeimg.com/140/140/any',
    // },
  },
  {
    id: 23,
    type: WebsocketMessageType.COMPLETE,
    sent_at: '2024-04-11 18:32:33',
    sender_id: 2,
    chat_room_id: 2,
    // user: {
    //   id: 1,
    //   name: 'React Native',
    //   avatar: 'https://placeimg.com/140/140/any',
    // },
  },
  {
    id: 25,
    type: WebsocketMessageType.COMPLETE,
    sent_at: '2024-04-11 18:32:33',
    sender_id: 2,
    chat_room_id: 2,
    // user: {
    //   id: 1,
    //   name: 'React Native',
    //   avatar: 'https://placeimg.com/140/140/any',
    // },
  },
];

export default messages;
