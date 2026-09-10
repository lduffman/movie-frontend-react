import { createRouter } from "@tanstack/react-router";
import {
  RouteError,
  RouteNotFound,
  RoutePending,
} from "@/components/route-status";
import { queryClient } from "@/lib/queryClient";
import { routeTree } from "@/routeTree.gen";

export const router = createRouter({
  routeTree,

  context: { queryClient, auth: undefined! },

  defaultPendingComponent: RoutePending,
  defaultErrorComponent: RouteError,
  defaultNotFoundComponent: RouteNotFound,

  defaultPendingMs: 300,
  defaultPendingMinMs: 500,
});

// Global typing for `Route.useRouter()` and `useMatch()`.
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
