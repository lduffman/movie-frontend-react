import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/AuthContext";

export function AuthMenu() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <Button asChild>
        <Link to="/login">Se connecter</Link>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={() => {
        logout();
        navigate({ to: "/movies" });
      }}
    >
      Se déconnecter
    </Button>
  );
}
