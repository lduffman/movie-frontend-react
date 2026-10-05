import { useEffect, useRef } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { useAuth } from "@/features/auth/AuthContext";
import { queryClient } from "@/lib/queryClient";
import { router } from "@/lib/router";

export function App() {
  const auth = useAuth();

  const wasAuthenticated = useRef(auth.isAuthenticated);

  // Changer le contexte du routeur ne rejoue pas les gardes. Quand le jeton
  // disparaît — déconnexion explicite ou 401 silencieux — on les force à se
  // réexécuter : `_authenticated` produit alors sa redirection vers `/login`.
  //
  // On réagit à la *transition* et non à l'état : un visiteur anonyme n'a rien
  // perdu, vider son cache et rejouer ses loaders au montage serait gratuit.
  useEffect(() => {
    const hasLostAuth = wasAuthenticated.current && !auth.isAuthenticated;
    wasAuthenticated.current = auth.isAuthenticated;

    if (!hasLostAuth) return;
    queryClient.clear();
    router.invalidate();
  }, [auth.isAuthenticated]);

  return <RouterProvider router={router} context={{ auth }} />;
}
