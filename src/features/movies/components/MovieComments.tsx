import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PaginationBar } from "@/components/pagination-bar";
import { RouteError } from "@/components/route-status";
import { PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { CommentCard } from "@/features/movies/components/CommentCard";
import { MovieCommentForm } from "@/features/movies/components/MovieCommentForm";
import { movieCommentsQuery } from "@/features/movies/queries";

const COMMENTS_PAGE_SIZE = 6;

export function MovieComments({ movieId }: { movieId: string }) {
  const [page, setPage] = useState(0);

  const { data, isPending, isError, error, isPlaceholderData } = useQuery({
    ...movieCommentsQuery(movieId, { page, size: COMMENTS_PAGE_SIZE }),
    placeholderData: keepPreviousData,
  });

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-medium">Commentaires de la communauté</h2>
        {data && (
          <p className="text-sm text-muted-foreground">
            {data.total} commentaire{data.total > 1 ? "s" : ""}
          </p>
        )}
      </div>

      {isError && <RouteError error={error} />}

      {isPending && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Chargement…
        </p>
      )}

      {data && data.items.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Aucun commentaire pour ce film.
        </p>
      )}

      {data && data.items.length > 0 && (
        <ul
          className="grid grid-cols-1 gap-3 transition-opacity data-[loading]:opacity-60 sm:grid-cols-2 lg:grid-cols-3"
          // Indice visuel discret pendant le chargement de la page suivante.
          data-loading={isPlaceholderData || undefined}
        >
          {data.items.map((comment) => (
            <li key={comment.id}>
              <CommentCard comment={comment} />
            </li>
          ))}
        </ul>
      )}

      {data && (
        <PaginationBar
          page={data.page}
          size={data.size}
          total={data.total}
          // `as="button"` : rien ne navigue, on met à jour un state. C'est tout
          // l'intérêt de la render prop — la même barre sert ici des boutons et
          // de vrais liens typés sur la liste de films.
          renderPrevious={(control) => (
            <PaginationPrevious
              as="button"
              type="button"
              disabled={control.disabled}
              text={control.text}
              onClick={() => setPage(control.page)}
            />
          )}
          renderNext={(control) => (
            <PaginationNext
              as="button"
              type="button"
              disabled={control.disabled}
              text={control.text}
              onClick={() => setPage(control.page)}
            />
          )}
        />
      )}

      <MovieCommentForm movieId={movieId} onCreated={() => setPage(0)} />
    </section>
  );
}
