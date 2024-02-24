const messages = [
  {
    _id: 1,
    text: 'This is a system message',
    createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
    system: true,
  },
  {
    _id: 2,
    text: 'Hello developer',
    createdAt: new Date(Date.UTC(2016, 5, 12, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 20,
    type: 'separator',
    createdAt: new Date(Date.UTC(2016, 5, 12, 17, 30, 0)),
    timeStamp: '2023년 12월 9일',
  },
  {
    _id: 17,
    text: 'This is a system message',
    createdAt: new Date(Date.UTC(2016, 5, 12, 17, 30, 0)),
    system: true,
  },
  {
    _id: 18,
    type: 'separator',
    createdAt: new Date(Date.UTC(2016, 5, 12, 17, 30, 0)),
    timeStamp: '2023년 12월 10일',
  },
  {
    _id: 3,
    text: 'Hi! I work from home today!',
    createdAt: new Date(Date.UTC(2016, 5, 13, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
    // image: 'https://placeimg.com/960/540/any',
  },
  {
    _id: 4,
    text: 'This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT',
    createdAt: new Date(Date.UTC(2016, 5, 14, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
    // quickReplies: {
    //   type: 'radio', // or 'checkbox',
    //   keepIt: true,
    //   values: [
    //     {
    //       title: '😋 Yes',
    //       value: 'yes',
    //     },
    //     {
    //       title: '📷 Yes, let me show you with a picture!',
    //       value: 'yes_picture',
    //     },
    //     {
    //       title: '😞 Nope. What?',
    //       value: 'no',
    //     },
    //   ],
    // },
  },
  {
    _id: 5,
    text: 'This is a quick reply. Do you love Gifted Chat? (checkbox)',
    createdAt: new Date(Date.UTC(2016, 5, 15, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
    quickReplies: {
      type: 'checkbox', // or 'radio',
      values: [
        {
          title: 'Yes',
          value: 'yes',
        },
        {
          title: 'Yes, let me show you with a picture!',
          value: 'yes_picture',
        },
        {
          title: 'Nope. What?',
          value: 'no',
        },
      ],
    },
  },
  {
    _id: 6,
    text: 'Come on!',
    createdAt: new Date(Date.UTC(2016, 5, 15, 18, 20, 0)),
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 7,
    text: `Hello this is an example of the ParsedText, links like http://www.google.com or http://www.facebook.com are clickable and phone number 444-555-6666 can call too.
          But you can also do more with this package, for example Bob will change style and David too. foo@gmail.com
          And the magic number is 42!
          #react #react-native`,
    createdAt: new Date(Date.UTC(2023, 5, 13, 20, 20, 0)),
    user: {
      _id: 1,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 23,
    type: 'end',
    quickReplies: {
      type: 'radio',
      title: '거래가 완료되었습니다.',
      description:
        '거래를 잘 마치셨나요? 거래 종료하기 버튼을 눌러 채팅을 종료하세요.',
      values: [
        { title: '불만족', value: 'dissatisfaction' },
        { title: '만족', value: 'satisfaction' },
      ],
    },
    createdAt: new Date(Date.UTC(2025, 5, 12, 17, 30, 0)),
    timeStamp: '2023년 12월 10일',
    user: {
      _id: 1,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 25,
    type: 'end',
    buttonDisabled: true,
    quickReplies: {
      type: 'radio',
      title: '거래가 완료되었습니다.',
      description:
        '거래를 잘 마치셨나요? 거래 종료하기 버튼을 눌러 채팅을 종료하세요.',
      values: [
        { title: '불만족', value: 'dissatisfaction' },
        { title: '만족', value: 'satisfaction' },
      ],
    },
    createdAt: new Date(Date.UTC(2025, 6, 12, 17, 30, 0)),
    timeStamp: '2023년 12월 10일',
    user: {
      _id: 1,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
];

export default messages;
