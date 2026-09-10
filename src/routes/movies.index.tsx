import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { RouteError, RoutePending } from "@/components/route-status";
import { MovieCard } from "@/features/movies/components/MovieCard";
import { MovieFilters } from "@/features/movies/components/MovieFilters";
import { MoviePagination } from "@/features/movies/components/MoviePagination";
import { movieGenresQuery, moviesQuery } from "@/features/movies/queries";
import { movieSearchSchema } from "@/features/movies/schemas";

export const Route = createFileRoute("/movies/")({
  validateSearch: movieSearchSchema,
  component: MoviesPage,
});

function MoviesPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const { data, isPending, isError, error } = useQuery(moviesQuery(search));
  const { data: movieGenres } = useQuery(movieGenresQuery());

  const updateFilters = (patch: Partial<typeof search>) => {
    navigate({
      search: (prev) => ({ ...prev, ...patch, page: 0 }),
      replace: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="text-2xl font-medium">Films</h1>
        {data && (
          <p className="text-sm text-muted-foreground">
            {data.total} film{data.total > 1 ? "s" : ""}
          </p>
        )}
      </div>

      <MovieFilters
        search={search}
        onChange={updateFilters}
        options={{ genres: movieGenres ?? [] }}
      />

      {isPending && <RoutePending />}
      {isError && <RouteError error={error} />}

      {data && (
        <>
          {data.items.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">
              Aucun film ne correspond à cette recherche.
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {data.items.map((movie) => (
                <li key={movie.id}>
                  <MovieCard movie={movie} />
                </li>
              ))}
            </ul>
          )}

          <MoviePagination
            page={data.page}
            size={data.size}
            total={data.total}
          />
        </>
      )}
    </div>
  );
}
