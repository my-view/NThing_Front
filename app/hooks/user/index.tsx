import { getUserInfoAPI } from 'api/user';
import { useQuery } from '@tanstack/react-query';
import { userKeys } from '../../key/user';

export function useUser() {
  // const token = get();

  const userInfo = useQuery({
    queryKey: userKeys.info(),
    queryFn: () => getUserInfoAPI(),
    enabled: false,
  });

  console.log('@@ userInfo', userInfo);

  return userInfo;
}
