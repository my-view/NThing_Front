export const chatRoomsKeys = {
  all: ['chatRooms'] as const,
  info: () => [...chatRoomsKeys.all, 'info'] as const,
};
