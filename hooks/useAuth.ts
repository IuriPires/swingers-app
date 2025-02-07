import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tokenManager } from "@/services/api";

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  login: (userData: { user: any; token: string }) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (userData) => {
        await tokenManager.setToken(userData.token);
        set({ isAuthenticated: true, user: userData.user });
      },
      logout: async () => {
        await tokenManager.removeToken();
        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useAuth = () => {
  const { isAuthenticated, user, login, logout } = useAuthStore();
  return { isAuthenticated, user, login, logout };
};
