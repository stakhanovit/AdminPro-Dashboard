import { User } from "@shared/schema";

const AUTH_STORAGE_KEY = "adminpro-auth";

export interface AuthState {
  user: Omit<User, "password"> | null;
  isAuthenticated: boolean;
}

export const getAuthState = (): AuthState => {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) {
      return { user: null, isAuthenticated: false };
    }
    
    const auth = JSON.parse(stored);
    return {
      user: auth.user,
      isAuthenticated: !!auth.user,
    };
  } catch {
    return { user: null, isAuthenticated: false };
  }
};

export const setAuthState = (user: Omit<User, "password"> | null) => {
  if (user) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user }));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
};

export const clearAuthState = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};
