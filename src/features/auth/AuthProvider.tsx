import { useCallback, useMemo, useState } from "react";
import { queryClient } from "@/lib/queryClient";
import { clearToken, getToken, setToken } from "@/lib/token";
import { AuthContext, type AuthState } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() => getToken());

  const login = useCallback((nextToken: string) => {
    setToken(nextToken);
    setTokenState(nextToken);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setTokenState(null);
    queryClient.clear();
  }, []);

  const value = useMemo<AuthState>(
    () => ({ token, isAuthenticated: token !== null, login, logout }),
    [token, login, logout],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}
