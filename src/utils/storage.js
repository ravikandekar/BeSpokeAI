import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  DOMAIN: '@ai_app_domain',
  USER: '@ai_app_user',
  LOGIN_STATUS: '@ai_app_is_logged_in',
  THEME_MODE: '@ai_app_theme_mode',
};

export const storage = {
  // Domain Management
  async saveDomain(domain) {
    try {
      await AsyncStorage.setItem(KEYS.DOMAIN, domain);
      return true;
    } catch (error) {
      console.error('Error saving domain:', error);
      return false;
    }
  },

  async getDomain() {
    try {
      const domain = await AsyncStorage.getItem(KEYS.DOMAIN);
      return domain;
    } catch (error) {
      console.error('Error getting domain:', error);
      return null;
    }
  },

  // User Management
  async saveUser(user) {
    try {
      await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('Error saving user:', error);
      return false;
    }
  },

  async getUser() {
    try {
      const user = await AsyncStorage.getItem(KEYS.USER);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  // Login Status Management
  async setLoginStatus(isLoggedIn) {
    try {
      await AsyncStorage.setItem(KEYS.LOGIN_STATUS, JSON.stringify(isLoggedIn));
      return true;
    } catch (error) {
      console.error('Error saving login status:', error);
      return false;
    }
  },

  async getLoginStatus() {
    try {
      const status = await AsyncStorage.getItem(KEYS.LOGIN_STATUS);
      return status ? JSON.parse(status) : false;
    } catch (error) {
      console.error('Error getting login status:', error);
      return false;
    }
  },

  // Theme Mode Management
  async saveThemeMode(isDark) {
    try {
      await AsyncStorage.setItem(KEYS.THEME_MODE, JSON.stringify(isDark));
      return true;
    } catch (error) {
      console.error('Error saving theme mode:', error);
      return false;
    }
  },

  async getThemeMode() {
    try {
      const mode = await AsyncStorage.getItem(KEYS.THEME_MODE);
      return mode ? JSON.parse(mode) : true; // Default to dark mode
    } catch (error) {
      console.error('Error getting theme mode:', error);
      return true;
    }
  },

  // Clear Data on Logout
  async clearUserData() {
    try {
      await AsyncStorage.removeItem(KEYS.USER);
      await AsyncStorage.removeItem(KEYS.LOGIN_STATUS);
      return true;
    } catch (error) {
      console.error('Error clearing user data:', error);
      return false;
    }
  },

  // Complete Reset
  async clearAll() {
    try {
      const keys = Object.values(KEYS);
      await AsyncStorage.multiRemove(keys);
      return true;
    } catch (error) {
      console.error('Error clearing all data:', error);
      return false;
    }
  },
};
