import { create } from "zustand";
import type { UserResponseDTO } from "../dto/response/auth_response_dto";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Role } from "../types/types";
import { jwtDecode } from "jwt-decode";
import { getCurrentProfile } from "../services/user";

interface AuthState {
  token: string | null;
  user: UserResponseDTO | null;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  isAdmin: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  checkTokenValidity: () => boolean;
  refreshToken: (newToken: string) => Promise<void>;
}

interface CustomJwtPayload {
  sub: string; // Subject (usually User ID)
  email: string; // Custom claim
  role: Role; // Custom claim (0 or 1)
  exp: number; // Expiration time (Standard JWT field)
  iat: number; // Issued at (Standard JWT field)
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isAdmin: false,

      login: async (token: string) => {
        set({ token });

        const isValid = get().checkTokenValidity();

        if (!isValid) {
          console.warn("Login aborted: Token is expired or invalid.");
          await get().logout();
          return;
        }

        try {
          const user = await getCurrentProfile();
          console.log(`CURRENT ROLE: ${user.currentRole}`);

          if (user?.currentRole !== 2) {
            alert("Unauthorized Access");
            await get().logout();
            return;
          }

          set({ isAuthenticated: true });
          set({ user });
        } catch (err) {
          console.error("Failed to fetch profile after login:", err);
          get().logout();
        }
      },

      logout: async () => {
        try {
          // 1️⃣ Clear in-memory auth state
          set({ token: null, user: null, isAuthenticated: false });

          await useAuthStore.persist.clearStorage();

          console.log(`NEW TOKEN: ${get().token}`);
        } catch (err) {
          console.error("❌ Error clearing auth store:", err);
        }
      },

      refreshUser: async () => {
        const isValid = get().checkTokenValidity();

        if (!isValid) {
          console.warn("Token expired. Logging out...");
          await get().logout();
          return;
        }

        try {
          const user = await getCurrentProfile();
          console.log(`USER: ${JSON.stringify(user)}`);
          set({ user });
        } catch (err) {
          console.error("Failed to refresh user:", err);
        }
      },

      checkTokenValidity: () => {
        const token = get().token;

        console.log(`YAWA: ${token}`);
        if (!token) return false;

        try {
          const decoded = jwtDecode<CustomJwtPayload>(token);

          if (!decoded.exp) return true;

          const now = Date.now() / 1000;
          const isExpired = decoded.exp < now;

          if (isExpired) {
            console.warn("JWT is expired based on calculation.");
            return false;
          }

          return true;
        } catch (error) {
          console.error("Invalid token format.");
          return false;
        }
      },

      refreshToken: async (newToken: string) => {
        await useAuthStore.persist.clearStorage();

        set({ token: newToken, isAuthenticated: true });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
