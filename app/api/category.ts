import axios from 'axios';
import { CategoryItem } from 'types/common';
import { CustomResponse } from 'types/modules';

export const getCategoryListAPI = async () => {
  return await axios.get<CustomResponse<CategoryItem[]>>('/categories');
};
