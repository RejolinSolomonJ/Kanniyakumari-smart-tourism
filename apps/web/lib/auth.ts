import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  language: string;
  isVerified: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  updateUser: (updates: Partial<User>) => void;
  setLanguage: (language: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      setAuth: (user: User, token: string) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("auth_token", token);
        }
        set({ user, token, isAuthenticated: true, isLoading: false });
      },

      logout: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token");
        }
        set({ user: null, token: null, isAuthenticated: false });
      },

      setLoading: (isLoading: boolean) => set({ isLoading }),

      updateUser: (updates: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } });
        }
      },

      setLanguage: (language: string) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, language } });
        }
      },
    }),
    {
      name: "kk-tourism-auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// ─── UI Store ───────────────────────────────
interface UIState {
  isMobileMenuOpen: boolean;
  isAIChatOpen: boolean;
  activeLanguage: "en" | "ta";
  searchQuery: string;

  // Actions
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleAIChat: () => void;
  closeAIChat: () => void;
  setLanguage: (lang: "en" | "ta") => void;
  setSearchQuery: (query: string) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isMobileMenuOpen: false,
  isAIChatOpen: false,
  activeLanguage: "en",
  searchQuery: "",

  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleAIChat: () =>
    set((state) => ({ isAIChatOpen: !state.isAIChatOpen })),
  closeAIChat: () => set({ isAIChatOpen: false }),
  setLanguage: (activeLanguage) => set({ activeLanguage }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
