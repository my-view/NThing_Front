import axios from 'axios';

export const searchCollegeAPI = async (params: string) => {
  return axios.get('/college', { params }).then((res) => {
    return res.data.data;
  });
};
