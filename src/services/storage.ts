import AsyncStorage from "@react-native-async-storage/async-storage";

export class Storage {
  static async set(key: string, value: any) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }

  static async get(key: string) {
    const value = await AsyncStorage.getItem(key);
    if (!value) return null;

    return JSON.parse(value);
  }

  static async remove(key: string) {
    await AsyncStorage.removeItem(key);
  }
}
