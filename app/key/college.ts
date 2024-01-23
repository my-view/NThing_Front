export const collegeQueryKeys = {
  all: ['college'] as const,
  search: (keyword?: string) =>
    [...collegeQueryKeys.all, 'search', { keyword }] as const,
};
