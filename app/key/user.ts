export const userKeys = {
  all: ['user'] as const,
  info: () => [...userKeys.all, 'info'] as const,
  edit: () => [...userKeys.all, 'edit'] as const,
};
