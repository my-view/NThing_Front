import axios from 'axios';
import { ChatRoomListItem } from 'types/chat';

export const getChatRoomsAPI = async () => {
  return await axios.get<ChatRoomListItem[]>('/chat/rooms');
};
