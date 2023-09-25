import * as React from 'react';

/**
 * navigate 를 prop으로 받거나 내려줄 수 없는 상황에서도 
 * navigationRef의 navigationRef.current.navigate를 이용해서
 * navigate나 현재 스크린의 정보를 알 수 있음.
 */
export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
