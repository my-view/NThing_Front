import axios from 'axios';

export const searchCollegeAPI = async (payload: any) => {
  const params: string = payload.queryKey[1];
  return axios.get('/college', { params });
};
