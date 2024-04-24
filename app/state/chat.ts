import { create } from 'zustand';
import { ChatMessage, ChatRoomListItem } from 'types/chat';

// chatRooms(채팅목록 볼 때)와 messages(특정 채팅방 안)는 각각 해당하는 상황에만 값이 존재하므로, 두가지 동시에 있을 수 없음
interface ChatStoreType {
  chatRooms: {
    [key in number]: {
      lastMessage: {
        sent_at: string;
      };
    };
  };
  messages: ChatMessage[];
  addChatRoom: (chatRoom: ChatRoomListItem) => void;
  setChatRooms: (chatRooms: ChatRoomListItem[]) => void;
  addMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
}

const useChatStore = create<ChatStoreType>((set, get) => ({
  chatRooms: {},
  messages: [],
  addChatRoom: (chatRoom) =>
    set((state) => {
      const chatRooms = state.chatRooms;
      chatRooms[chatRoom.id] = { lastMessage: { sent_at: chatRoom.createdAt } };
      return { chatRooms };
    }),
  setChatRooms: (chatRooms) => {
    set({ messages: [] });
    chatRooms.forEach((x) => {
      if (get().chatRooms[x.id]) return;
      get().addChatRoom(x);
    });
  },
  addMessages: (messages) => {
    set({ chatRooms: {} });
    // 이러면 concat으로 새로운 값을 만들어서 messages에 할당되는건지?
    // => 그럼 상태값이 통째로 바뀐 것으로 인식되나? (상태값의 깊은 수준에 위치한 값 일부가 바뀌어도 전체가 바뀐 것으로 간주하고 전체 재렌더링되나?)
    // get으로 가져온 다음 push 등으로 원본을 수정하면 어떤지?
    set((state) => ({ messages: state.messages.concat(messages) }));
  },
  addMessage: (message) => {
    const chatStore = get();
    // 메시지 내용 있으면 채팅방 내부이므로 메시지 목록에 추가
    if (chatStore.messages.length)
      set((state) => ({ messages: [...state.messages, message] }));
    if (!Object.keys(chatStore.chatRooms).length) return;
    // 채팅방 목록 있으면 마지막 메시지 내용 수정
    set((state) => {
      const chatRooms = state.chatRooms;
      chatRooms[message.id] = { lastMessage: { sent_at: message.sent_at } };
      return { chatRooms };
    });
  },
}));

export default useChatStore;
