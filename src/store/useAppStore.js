import { create } from 'zustand';

export const useAppStore = create((set) => ({
  // Theme State
  isDarkMode: true,
  setIsDarkMode: (isDarkMode) => set({ isDarkMode }),

  // Auth State
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  // User Data
  domain: null,
  setDomain: (domain) => set({ domain }),

  user: null,
  setUser: (user) => set({ user }),

  // Loading State
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),

  // Actions
  logout: () => set({
    isLoggedIn: false,
    user: null,
  }),

  reset: () => set({
    isDarkMode: true,
    isLoggedIn: false,
    domain: null,
    user: null,
    isLoading: false,
  }),
}));
