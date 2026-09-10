import { RouterProvider } from "@tanstack/react-router";
import { useAuth } from "@/features/auth/AuthContext";
import { router } from "@/lib/router";

export function App() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}
