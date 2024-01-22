export const purchaseQueryKeys = {
  all: ['purchase'] as const,
  detail: (id?: number) =>
    [...purchaseQueryKeys.all, 'detail', { id }] as const,
  comment: (id?: number) =>
    [...purchaseQueryKeys.all, 'comment', { id }] as const,
};
