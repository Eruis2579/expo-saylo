// utils/storage.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  async set(key: string, value: any) {
    try {
      const json = JSON.stringify(value);
      await AsyncStorage.setItem(key, json);
    } catch (error) {
      console.error('AsyncStorage set error:', error);
    }
  },

  async get<T>(key: string): Promise<T | null> {
    try {
      const json = await AsyncStorage.getItem(key);
      return json != null ? JSON.parse(json) : null;
    } catch (error) {
      console.error('AsyncStorage get error:', error);
      return null;
    }
  },

  async remove(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('AsyncStorage remove error:', error);
    }
  },

  async clear() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('AsyncStorage clear error:', error);
    }
  },
};
