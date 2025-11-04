import AsyncStorage from '@react-native-async-storage/async-storage';

export class AsyncStorageService {
  private static USER_KEY = '@user_session';

  static async saveUserSession(userId: string): Promise<void> {
    try {
      await AsyncStorage.setItem(this.USER_KEY, userId);
    } catch (error) {
      console.error('Error saving user session:', error);
    }
  }

  static async getUserSession(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(this.USER_KEY);
    } catch (error) {
      console.error('Error getting user session:', error);
      return null;
    }
  }

  static async clearUserSession(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.USER_KEY);
    } catch (error) {
      console.error('Error clearing user session:', error);
    }
  }
}