import { useCallback } from 'react';

interface errorStatusType {
  default?: () => void;
  [key: number]: {
    [key: number | string]: void;
  };
}
interface handlerType {
  [key: number]: {
    [key: number | string]: () => void;
  };
}

export const useApiError = (handler?: handlerType) => {
  const defaultErrorHandler = () => {
    console.log('defaultErrorHandler');
  };
  const errorHandler400 = () => {
    // console.log('400');
  };
  const errorHandler401 = () => {
    // console.log('401');
  };
  const errorHandler403 = () => {
    // console.log('403');
  };
  const errorHandler500 = () => {
    // console.log('500');
  };

  const errorStatus: errorStatusType = {
    default: defaultErrorHandler,
    400: {
      default: errorHandler400(),
    },
    401: {
      default: errorHandler401(),
    },
    403: {
      default: errorHandler403(),
    },
    500: {
      default: errorHandler500(),
    },
  };

  const testError = {
    errorCode: 400,
    errorStatus: 400,
  };

  const handleError = useCallback(
    (error: any) => {
      const httpStatus = testError.errorStatus;
      const errorCode = testError.errorCode;

      // 공통 에러처리 우선순위 부여
      switch (true) {
        // 컴포넌트에서 handler로 컴포넌트 에러 상황에 맞게 실행시 ... 에러가 안꺼진다..
        case handler && !!handler[httpStatus][errorCode]:
          handler[httpStatus][errorCode]();
          break;

        // 훅에서 정의한 공통 에러 처리
        // case errorStatus[httpStatus][errorCode]:
        // errorStatus[httpStatus][errorCode]();
        // break;
        // 어디에서도 정의되지 않은 에러 처리
        default:
        // errorStatus.default();
      }
    },
    [handler],
  );

  return { handleError };
};

// ------------- 컴포넌트에서 에러 커스텀 -----------------

// ...

// HTTP Status가 409이면서 서비스 표준 에러 Code가 10001일 때 실행할 핸들러 함수
// const errorHandler40910001 = () => {
//   // 컴포넌트의 상황에 맞게 처리 로직을 작성
// };
// // HTTP Status가 500일 때 실행할 핸들러 함수
// const errorHandler500 = () => {
//   // 컴포넌트의 상황에 맞게 처리 로직을 작성
// };

// const { handleError } = useApiError({
//   409: {
//     10001: errorHandler40910001,
//   },
//   500: {
//     default: errorHandler500,
//   },
// });

// const { isLoading, error, data, isFetching } = useQuery('key', fetchData, {
//   onError: handleError,
// });

// ...
