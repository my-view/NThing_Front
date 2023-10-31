import { useState } from 'react';
import { useQuery } from 'react-query';
import { searchCollegeAPI } from '~/api/college';
import { useApiError } from '../useApiError';

export function useCollege() {
  const { handleError } = useApiError();
  const [searchForm, setsearchForm] = useState({ search_keyword: '' });
  const [collegeList, setCollegeList] = useState({});

  const searchCollege = useQuery(
    ['searchCollege', [searchForm]],
    searchCollegeAPI,
    {
      onSuccess: (res) => {
        setCollegeList(res);
      },

      onError: (err) => {
        handleError(err.code);
      },
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: 0,
    },
  );

  return { setsearchForm, collegeList };
}
