import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ModeToggle } from "@/components/mode-toggle";
import { AuthMenu } from "@/features/auth/components/AuthMenu";
import { type AuthState } from "@/features/auth/AuthContext";

export interface RouterContext {
  queryClient: QueryClient;
  auth: AuthState;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b">
        <nav className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4">
          <Link to="/movies" className="font-medium">
            🎬 Movie Library
          </Link>
          <Link
            to="/movies"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground"
          >
            Films
          </Link>
          <Link
            to="/me/library"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground"
          >
            Ma bibliothèque
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <AuthMenu />
            <ModeToggle />
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <Outlet />
      </main>

      <TanStackRouterDevtools position="bottom-left" />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
    </div>
  );
}
