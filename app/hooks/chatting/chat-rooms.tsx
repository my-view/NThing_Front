import { useQuery } from '@tanstack/react-query';
import { getChatRoomsAPI } from 'api/chatting';
import { chatRoomsKeys } from 'key/chatting';

export function useChatRooms() {
  const test = false;

  const chatRooms = useQuery({
    queryKey: chatRoomsKeys.info(),
    queryFn: getChatRoomsAPI,
    enabled: test,
  });

  return chatRooms;
}
