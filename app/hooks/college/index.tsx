import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchCollegeAPI } from '~/api/college';
import { useApiError } from '../useApiError';
import { collegeQueryKeys } from '../../key/college';
import { College } from '~/types/common';

export function useCollege() {
  const [searchForm, setsearchForm] = useState({ search_keyword: '' });
  const [collegeList, setCollegeList] = useState({});

  const searchCollege = useQuery<College>({
    queryKey: collegeQueryKeys.search(searchForm),
    queryFn: () => searchCollegeAPI(searchForm.search_keyword),

    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return { setsearchForm, searchCollege };
}
