// TODO: 파일명 고민
import { SortType } from 'types/common';

export const defaultSortOption = { nm: '최신순', cd: 'p.created_at' };

export const sortOptions: SortType[] = [
  defaultSortOption,
  { nm: '높은가격순', cd: '-p.price' },
  { nm: '낮은가격순', cd: 'p.price' },
  { nm: '마감임박순', cd: 'p.date' },
  { nm: '시간임박순', cd: 't_dl' },
  { nm: '가까운순', cd: 'distance' },
];

export const TOKEN_STORAGE_KEY = 'NT-AUTH-TOKEN';

const BASE_URL = 'nthing.kkookkss.synology.me';
export const SERVER_URL = `https://${BASE_URL}`;
export const WEBSOCKET_SERVER_URL = `wss://${BASE_URL}`;
