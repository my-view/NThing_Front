export enum ChatStatus {
  EXPECT = '거래예정',
  RECRUIT = '모집중',
  CANCEL = '거래취소',
  COMPLETE = '거래완료',
}

export type ChatListType = {
  id: number;
  title: string;
  last_message: string;
  navigate: string;
  trade_status: keyof typeof ChatStatus;
};

export interface ChatUser {
  _id?: string | number;
  name?: string;
  avatar?: string;
}

export interface IMessage {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user?: ChatUser;
  image?: string;
  video?: string;
  sent?: boolean;
  received?: boolean;
  type?: 'separator' | 'end';
  timeStamp?: string;
  buttonDisabled?: boolean;
  quickReplies?: {
    type: 'radio';
    title: string;
    description: string;
    values: {
      title: string;
      value: string;
    }[];
  };
}
