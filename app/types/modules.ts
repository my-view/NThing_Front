import React, { PropsWithChildren } from 'react';

declare module 'react' {
  // shorthand for `Function Component With Children`
  // https://stackoverflow.com/a/59106817/3535760
  export type FCC<P = {}> = React.FC<PropsWithChildren<P>>;
}
