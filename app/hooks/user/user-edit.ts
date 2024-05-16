import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { patchUserInfoAPI } from 'api/user';
import { userKeys } from 'key/user';
import { userInfoType } from 'types/user';

export const useEditUser = () => {
  const queryClient = useQueryClient();
  return useMutation<userInfoType, AxiosError, FormData>({
    mutationKey: userKeys.edit(),
    mutationFn: (form: FormData) => patchUserInfoAPI(form),
    onSuccess(data) {
      queryClient.setQueryData<userInfoType>(userKeys.info(), data);
    },
  });
};
