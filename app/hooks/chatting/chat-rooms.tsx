import { useQuery } from '@tanstack/react-query';
import { getChatRoomsAPI } from 'api/chatting';
import { chatRoomsKeys } from 'key/chatting';

export function useChatRooms(isManager?: boolean) {
  const chatRooms = useQuery({
    queryKey: chatRoomsKeys.info(),
    queryFn: () => getChatRoomsAPI(isManager),
  });

  return chatRooms;
}
