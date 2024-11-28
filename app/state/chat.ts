import { create } from 'zustand';
import { ChatListType, ReceivedMessage, ChatRoomListItem } from 'types/chat';

// chatRooms(채팅목록 볼 때)와 messages(특정 채팅방 안)는 각각 해당하는 상황에만 값이 존재하므로, 두가지 동시에 있을 수 없음
interface ChatStoreType {
  chatRooms: {
    [key in number]: ChatListType;
  };
  messages: ReceivedMessage[];
  formatChatRoom: (chatRoom: ChatRoomListItem) => ChatListType;
  setChatRooms: (chatRooms: ChatRoomListItem[]) => void;
  addMessages: (messages: ReceivedMessage[]) => void;
  addMessage: (message: ReceivedMessage) => void;
}

const useChatStore = create<ChatStoreType>((set, get) => ({
  chatRooms: {},
  messages: [],
  formatChatRoom: (chatRoom) => ({
    id: chatRoom.id,
    title: chatRoom.purchase.title,
    last_message: {
      content: chatRoom.last_message.message,
      sent_at: chatRoom.last_message.sent_at,
    },
    trade_status: chatRoom.purchase.purchase_status,
    image: '../../assets/image/item-example.png',
  }),
  setChatRooms: (data) => {
    set({ messages: [] });
    const newChatRooms = data.filter((x) => !get().chatRooms[x.id]);
    set((state) => {
      const chatRooms = state.chatRooms;
      newChatRooms.forEach((x) => (chatRooms[x.id] = get().formatChatRoom(x)));
      return { chatRooms };
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
      chatRooms[message.id].last_message = {
        content: message.content || '', // TODO: 메시지 타입별로 변환 필요?
        sent_at: message.sent_at,
      };
      return { chatRooms };
    });
  },
}));

export default useChatStore;
