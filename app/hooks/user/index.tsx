import { getUserInfoAPI } from 'api/user';
import { useQuery } from '@tanstack/react-query';
import { userKeys } from '../../key/user';
import { useLogin } from '../login/login';

export function useUser(serviceToken: string) {
  console.log('@@ useUser serviceToken', serviceToken);

  // const token = get();

  const userInfo = useQuery({
    queryKey: userKeys.info(),
    queryFn: () => getUserInfoAPI(serviceToken),
    enabled: !!serviceToken,
  });

  console.log('@@ userInfo', userInfo);

  return userInfo;
}
