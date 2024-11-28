import axios from 'axios';
import { ChatRoomListItem } from 'types/chat';

export const getChatRoomsAPI = async (isManager?: boolean) => {
  return await axios.get<ChatRoomListItem[]>('/chat/rooms', {
    params: { isManager },
  });
};
