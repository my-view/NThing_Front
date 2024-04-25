import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchCollegeAPI } from 'api/college';
import { collegeQueryKeys } from 'key/college';

export function useCollege() {
  const [searchKeyword, setSearchKeyword] = useState('');

  const searchCollege = useQuery({
    queryKey: collegeQueryKeys.search(searchKeyword),
    queryFn: () => searchCollegeAPI({ search_keyword: searchKeyword }),

    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return { setSearchKeyword, searchCollege };
}
