export const categoryKeys = {
  all: ['category'] as const,
  info: () => [...categoryKeys.all, 'info'] as const,
};
