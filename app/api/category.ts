import axios from 'axios';
import { CategoryItem, Envelope } from '~/types/common';

export const getCategoryListAPI = async () => {
  return await axios.get<Envelope<CategoryItem[]>>('/categories');
};
