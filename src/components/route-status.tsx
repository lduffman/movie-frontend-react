import { Link } from '@tanstack/react-router'

/**
 * Frontières par défaut du routeur, branchées une fois dans `createRouter`
 * (`defaultPendingComponent`, `defaultErrorComponent`, `defaultNotFoundComponent`).
 * Une route peut toujours en redéfinir une localement — c'est ce que fait
 * `/movies/$movieId` pour son erreur.
 */

export function RoutePending() {
  return (
    <div className="flex items-center gap-3 py-16 text-sm text-muted-foreground">
      <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      Chargement…
    </div>
  )
}

export function RouteError({ error }: { error: unknown }) {
  const message = error instanceof Error ? error.message : String(error)

  return (
    <div className="space-y-2 rounded-lg border border-destructive/40 bg-destructive/10 p-4">
      <h2 className="font-medium text-destructive">Une erreur est survenue</h2>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  )
}

export function RouteNotFound() {
  return (
    <div className="space-y-3 py-16 text-center">
      <h2 className="text-lg font-medium">Page introuvable</h2>
      <p className="text-sm text-muted-foreground">
        Cette URL ne correspond à aucune route.
      </p>
      <Link to="/movies" className="text-sm underline underline-offset-4">
        Retour aux films
      </Link>
    </div>
  )
}
