import { getUserInfoAPI } from 'api/user';
import { useQuery } from '@tanstack/react-query';
import { userKeys } from './key';

export function useUser() {
  const userInfo = useQuery({
    queryKey: userKeys.info(),
    queryFn: getUserInfoAPI,
  });

  return userInfo;
}
