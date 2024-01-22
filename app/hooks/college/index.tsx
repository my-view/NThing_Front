import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchCollegeAPI } from '~/api/college';
import { useApiError } from '../useApiError';
import { collegeQueryKeys } from './key';

export function useCollege() {
  const [searchForm, setsearchForm] = useState({ search_keyword: '' });
  const [collegeList, setCollegeList] = useState({});

  const searchCollege = useQuery({
    queryKey: collegeQueryKeys.search(searchForm),
    queryFn: () => searchCollegeAPI(searchForm),

    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return { setsearchForm, searchCollege };
}
