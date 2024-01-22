import { Coordinate } from 'types/common';

export const PINS: Coordinate[] = [
  { id: 1, latitude: 37.564362, longitude: 126.977011 },
  { id: 2, latitude: 37.565051, longitude: 126.978567 },
  { id: 3, latitude: 37.565383, longitude: 126.976292 },
];

// radius 삭제, zoom으로
export const defaultCenterPosition = {
  latitude: 37.56363901004543,
  longitude: 126.93927584825141,
  zoom: 16,
  search_keyword: '',
  radius: 100000000,
  sort: '',
};

export const userPosition = {
  latitude: 37.56363901004543,
  longitude: 126.93927584825141,
  zoom: 16,
  search_keyword: '',
  radius: 100000000,
  sort: '',
};
