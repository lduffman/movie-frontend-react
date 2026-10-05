import { RouteError, RoutePending } from "@/components/route-status";
import { LibraryEntryStatus } from "@/features/library/components/LibraryEntryStatus";
import { LibraryFilters } from "@/features/library/components/LibraryFilters";
import { LibraryPagination } from "@/features/library/components/LibraryPagination";
import { getMyLibraryQuery } from "@/features/library/queries";
import { librarySearchSchema } from "@/features/library/schemas";
import { MovieCard } from "@/features/movies/components/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/me/library")({
  validateSearch: librarySearchSchema,
  component: RouteComponent,
});

function EmptyLibrary() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="py-16 text-center text-sm text-muted-foreground">
        Vous n'avez pas encore de films dans votre bibliothèque.
      </p>
      <Link to="/movies" className="text-sm underline underline-offset-4">
        Parcourir les films
      </Link>
    </div>
  );
}

function RouteComponent() {
  const search = Route.useSearch();

  const { data, isPending, isError, error } = useQuery(
    getMyLibraryQuery(search),
  );

  const navigate = Route.useNavigate();
  const updateFilters = (patch: Partial<typeof search>) => {
    navigate({
      search: (prev) => ({ ...prev, ...patch, page: 0 }),
      replace: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="text-2xl font-medium">Ma bibliothèque</h1>
        {data && (
          <p className="text-sm text-muted-foreground">
            {data.total} film{data.total > 1 ? "s" : ""}
          </p>
        )}
      </div>

      <LibraryFilters search={search} onChange={updateFilters} />

      {isPending && <RoutePending />}
      {isError && <RouteError error={error} />}

      {data && (
        <>
          {data.items.length === 0 ? (
            <>
              {data.total === 0 ? (
                <EmptyLibrary />
              ) : (
                <p className="py-16 text-center text-sm text-muted-foreground">
                  Aucun film ne correspond à cette recherche.
                </p>
              )}
            </>
          ) : (
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {data.items.map((entry) => (
                <li key={entry.movie.id}>
                  <MovieCard
                    movie={entry.movie}
                    extra={<LibraryEntryStatus entry={entry} />}
                  />
                </li>
              ))}
            </ul>
          )}

          <LibraryPagination
            page={data.page}
            size={data.size}
            total={data.total}
          />
        </>
      )}
    </div>
  );
}
