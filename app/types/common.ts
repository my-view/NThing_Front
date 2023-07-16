export interface WithIdName {
  id: number;
  name: string;
}

export interface stringType {
  title: string;
}

export interface Coordinate {
  id: number;
  latitude: number;
  longitude: number;
}

export interface College extends Coordinate {
  name: string;
  address: string;
}
