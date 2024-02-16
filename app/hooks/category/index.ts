import { useQuery } from '@tanstack/react-query';
import { categoryKeys } from 'key/category';
import { getCategoryListAPI } from 'api/category';

// STEP2: API 캐싱
export function useFetchCategoryList() {
  return useQuery({
    queryKey: categoryKeys.info(),
    queryFn: () => getCategoryListAPI(),
  });
}

// STEP3: 페이지 훅
// export function useCategoryList() {
//   const { data: categories } = useFetchCategoryList();
//   return { categories };
// }
