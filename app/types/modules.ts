import { AxiosRequestConfig, AxiosResponseHeaders } from 'axios';
import React, { PropsWithChildren } from 'react';

declare module 'react' {
  // shorthand for `Function Component With Children`
  // https://stackoverflow.com/a/59106817/3535760
  export type FCC<P = {}> = React.FC<PropsWithChildren<P>>;
}

export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: AxiosResponseHeaders;
  config: AxiosRequestConfig;
  request?: any;
}

export interface CustomResponse<T> {
  code: string | null;
  data: T;
  message: string | null;
  status: number;
}
