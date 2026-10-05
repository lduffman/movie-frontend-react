import { useCallback, useMemo, useSyncExternalStore } from "react";
import { clearToken, getToken, setToken, subscribeToken } from "@/lib/token";
import { AuthContext, type AuthState } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Le jeton n'est pas recopié dans un état React : on s'abonne au store.
  // Le `clearToken()` de l'intercepteur axios, sur un 401, suffit donc à faire
  // basculer `isAuthenticated` — sans événement ni callback à câbler.
  const token = useSyncExternalStore(subscribeToken, getToken);

  const login = useCallback((nextToken: string) => setToken(nextToken), []);
  const logout = useCallback(() => clearToken(), []);

  const value = useMemo<AuthState>(
    () => ({ token, isAuthenticated: token !== null, login, logout }),
    [token, login, logout],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}
