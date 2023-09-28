// https://velog.io/@mayinjanuary/React-Native-navigation-without-navigation-prop#3-%EA%B7%B8%EB%9F%BC-%EC%9D%B4%EC%A0%9C-apptsx-%EB%82%B4%EB%B6%80%EC%97%90%EC%84%9C-navigation-%EC%9D%B4-%EA%B0%80%EB%8A%A5%ED%95%A9%EB%8B%88%EB%8B%A4
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
