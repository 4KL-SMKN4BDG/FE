// src/store/auth.store.ts
import { create } from "zustand";
import {
  loginAPI,
  LoginCredentials,
  LoginResponse,
  refreshTokenAPI,
  User,
} from "@/restApi/auth.api";
import getErrorMessage from "@/restApi/helper.api";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  selectedRole: string | null;
  isAuth: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<string | null>;
  setSelectedRole: (role: string) => void;
  loadSession: () => void;
  setAuth: (value: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,
  selectedRole: sessionStorage.getItem("selectedRole") || null,
  isAuth: true,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const response: LoginResponse = await loginAPI(credentials);
      const { user, token } = response.data;

      set({
        user,
        token: token.access_token,
        isLoading: false,
      });

      sessionStorage.setItem("token", token.access_token);
      localStorage.setItem("refresh", token.refresh_token);
      sessionStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      set({
        error: getErrorMessage(error, "Login failed. Please try again."),
        isLoading: false,
      });
    }
  },

  logout: () => {
    set({
      user: null,
      token: null,
      error: null,
      isLoading: false,
      selectedRole: null,
    });
    localStorage.clear();
    sessionStorage.clear();
  },

  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem("refresh") ?? "";
      const response: LoginResponse = await refreshTokenAPI(refreshToken);
      const { token } = response.data;

      sessionStorage.setItem("token", token.access_token);
      localStorage.setItem("refresh", token.refresh_token);
      set({ token: token.access_token });

      return token.access_token;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      set({ user: null, token: null, error: errorMessage });
      sessionStorage.removeItem("token");
      return null;
    }
  },

  setSelectedRole: (role: string) => {
    set({ selectedRole: role });
    sessionStorage.setItem("selectedRole", role);
  },

  loadSession: () => {
    const savedUser = sessionStorage.getItem("user");
    const savedRole = sessionStorage.getItem("selectedRole");
    const savedToken = sessionStorage.getItem("token");
    if (savedUser || savedRole || savedToken) {
      set({
        user: savedUser ? JSON.parse(savedUser) : null,
        selectedRole: savedRole || null,
        token: savedToken || null,
      });
    }
  },

  setAuth: (value: boolean) => {
    set({ isAuth: value });
  },
}));

export default useAuthStore;
