const TOKEN_KEY = "movie-library.token";

const listeners = new Set<() => void>();

/** `subscribe` de `useSyncExternalStore` : renvoie la fonction de désabonnement. */
export function subscribeToken(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Sert de `getSnapshot`. React compare le résultat avec `Object.is` à chaque
 * rendu : ça ne fonctionne que parce qu'on renvoie une chaîne ou `null`,
 * comparées par valeur. Renvoyer un objet créerait une nouvelle référence à
 * chaque appel, et React boucherait à l'infini.
 */
export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  sessionStorage.setItem(TOKEN_KEY, token);
  listeners.forEach((listener) => listener());
}

export function clearToken(): void {
  sessionStorage.removeItem(TOKEN_KEY);
  listeners.forEach((listener) => listener());
}
