import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_STORAGE_KEY } from './constants';

export const getStorage = async (key: string) => {
  const result = await AsyncStorage.getItem(key);
  return result && JSON.parse(result);
};

export const setStorage = async (key: string, value: any) => {
  return await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const removeStorage = async (key: string) => {
  return await AsyncStorage.removeItem(key);
};

export const clearStorage = AsyncStorage.clear();
export const get = async () => {
  try {
    const savedToken = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
    const token = savedToken ? JSON.parse(savedToken) : null; // 저장된 값이 없을 경우 null 처리
    console.log('get token', token);

    return token;
  } catch (error) {
    console.log('Error getting token:', error);
    return null; // 에러 발생 시 null 반환
  }
};
