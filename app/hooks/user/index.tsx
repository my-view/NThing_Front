import { getUserInfoAPI } from 'api/user';
import { useQuery } from '@tanstack/react-query';
import { userKeys } from '../../key/user';

export function useUser(token: string) {
  console.log('@@ token', token);

  const userInfo = useQuery({
    queryKey: userKeys.info(),
    queryFn: getUserInfoAPI,
    enabled: !!token,
  });

  return userInfo;
}
