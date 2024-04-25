import axios from 'axios';
import { College } from 'types/common';

export const searchCollegeAPI = async (params: { search_keyword: string }) => {
  return axios.get<College>('/college', { params });
};
