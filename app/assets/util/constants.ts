// TODO: 파일명 고민

import { SortType } from 'types/common';

export const defaultSortOption = { nm: '최신순', cd: 'recent' };

export const sortOptions: SortType[] = [
  defaultSortOption,
  { nm: '가격순', cd: 'price' },
  { nm: '마감임박순', cd: 'i_dl' },
  { nm: '시간임박순', cd: 't_dl' },
];

export const TOKEN_STORAGE_KEY = 'NT-AUTH-TOKEN';
