import { College } from 'types/common';
import { getRequest } from 'api/fetcher';

export const searchCollegeAPI = async (payload: any) => {
  const params: string = payload.queryKey[1];
  return getRequest<College>('/college', { params });
};
