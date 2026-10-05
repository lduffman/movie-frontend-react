import { Link } from "@tanstack/react-router";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Movie } from "@/features/movies/schemas";
import { StarIcon } from "lucide-react";
import type { ReactNode } from "react";

export function MovieCard({ movie, extra }: { movie: Movie; extra?: ReactNode }) {

  return (
    <Link
      to="/movies/$movieId"
      params={{ movieId: movie.id }}
      search={true}
      className="group block h-full focus-visible:outline-none"
      replace={false}
    >
      <Card className="h-full pt-0 transition-all group-hover:ring-2 group-hover:ring-ring/40 group-focus-visible:ring-2 group-focus-visible:ring-ring">
        <div className="aspect-2/3 overflow-hidden rounded-t-xl bg-muted">
          {movie.posterUrl ? (
            <img
              src={movie.posterUrl}
              alt=""
              loading="lazy"
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center px-2 text-center text-xs text-muted-foreground">
              Pas d'affiche
            </div>
          )}
        </div>

        <CardHeader>
          <CardTitle className="truncate" title={movie.title}>
            {movie.title}
          </CardTitle>
          <CardDescription className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
            {movie.year}
            {/* `rating` est nullable dans l'OpenAPI : jamais de `.toFixed()` direct. */}
            {movie.rating !== null && (
              <>
                {" — "}
                <StarIcon
                  className="inline h-4 w-4"
                  style={{ color: "#e4c616", fill: "#e4c616" }}
                />
                {movie.rating.toFixed(1)}
              </>
            )}
          </CardDescription>
          {extra}
        </CardHeader>

        {movie.genres.length > 0 && (
          <CardFooter className="gap-1.5 overflow-hidden">
            {movie.genres.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="truncate rounded-md bg-background px-2 py-0.5 text-xs text-muted-foreground ring-1 ring-foreground/10"
              >
                {genre}
              </span>
            ))}
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
