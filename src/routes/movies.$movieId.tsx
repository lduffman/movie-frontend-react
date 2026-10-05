import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RoutePending } from "@/components/route-status";
import { movieQuery } from "@/features/movies/queries";
import { Separator } from "@/components/ui/separator";
import { MovieComments } from "@/features/movies/components/MovieComments";
import { StarIcon } from "lucide-react";
import { LibraryEntryCard } from "@/features/library/components/LibraryEntryCard";

export const Route = createFileRoute("/movies/$movieId")({
  component: MovieDetailPage,
  errorComponent: MovieDetailError,
});

function MovieDetailPage() {
  const { movieId } = Route.useParams();
  const {
    data: movie,
    isPending,
    isError,
    error,
  } = useQuery(movieQuery(movieId));

  if (isPending) return <RoutePending />;
  if (isError) throw error;

  return (
    <article className="flex flex-col space-y-6 gap-6">
      <Link
        to="/movies"
        search={true}
        className="text-sm text-muted-foreground underline underline-offset-4"
      >
        ← Retour aux films
      </Link>

      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="flex w-48 shrink-0 flex-col gap-4">
          {movie.posterUrl && (
            <img
              src={movie.posterUrl}
              alt=""
              className="w-full rounded-lg border object-cover"
            />
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-3">
          <h1 className="text-2xl font-medium">
            {movie.title}{" "}
            <span className="text-muted-foreground">({movie.year})</span>
          </h1>

          <ul className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <li
                key={genre}
                className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
              >
                {genre}
              </li>
            ))}
          </ul>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
            {movie.rating !== null && (
              <>
                <dt className="text-muted-foreground">Note</dt>
                <dd className="flex items-center gap-1">
                  <StarIcon
                    className="inline h-4 w-4"
                    style={{ fill: "#e4c616", color: "#e4c616" }}
                  />
                  {movie.rating.toFixed(1)}
                </dd>
              </>
            )}
            {movie.runtime !== null && (
              <>
                <dt className="text-muted-foreground">Durée</dt>
                <dd>{movie.runtime} min</dd>
              </>
            )}
            {movie.votes !== null && (
              <>
                <dt className="text-muted-foreground">Votes</dt>
                <dd>{movie.votes.toLocaleString("fr-FR")}</dd>
              </>
            )}
            <dt className="text-muted-foreground">Réalisation</dt>
            <dd>{movie.directors.join(", ") || "—"}</dd>
            <dt className="text-muted-foreground">Scénario</dt>
            <dd>{movie.writers.join(", ") || "—"}</dd>
          </dl>
          <Separator className="my-2" />

          {movie.plot && (
            <p className="text-lg leading-relaxed">{movie.plot}</p>
          )}
        </div>
      </div>
      <div className="flex ">
        <LibraryEntryCard movieId={movieId} />
      </div>
      <MovieComments key={movieId} movieId={movieId} />
    </article>
  );
}

function MovieDetailError({ error }: { error: unknown }) {
  const { movieId } = Route.useParams();
  const message = error instanceof Error ? error.message : String(error);

  return (
    <div className="space-y-3 rounded-lg border border-destructive/40 bg-destructive/10 p-4">
      <h1 className="font-medium text-destructive">Film introuvable</h1>
      <p className="text-sm text-muted-foreground">
        Aucun film ne correspond à l'identifiant <code>{movieId}</code>.
      </p>
      <p className="text-xs text-muted-foreground">{message}</p>
      <Link
        to="/movies"
        search={true}
        className="text-sm underline underline-offset-4"
      >
        Retour aux films
      </Link>
    </div>
  );
}
