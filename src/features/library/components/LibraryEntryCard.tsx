import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import StarRating from "@/components/commerce-ui/star-rating-fractions";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/features/auth/AuthContext";
import {
  getLibraryEntryQuery,
  removeMovieFromLibraryMutation,
  upsertLibraryEntryMutation,
} from "@/features/library/queries";

const MAX_STARS = 5;

export function LibraryEntryCard({ movieId }: { movieId: string }) {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const { data: entry, isPending } = useQuery({
    ...getLibraryEntryQuery(movieId),
    enabled: isAuthenticated,
  });

  // Le préfixe `["library"]` couvre la liste et le détail de l'entrée.
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["library"] });

  const upsert = useMutation({
    ...upsertLibraryEntryMutation(movieId),
    onSuccess: invalidate,
  });
  const remove = useMutation({
    ...removeMovieFromLibraryMutation(movieId),
    onSuccess: invalidate,
  });

  const isBusy = upsert.isPending || remove.isPending;

  if (!isAuthenticated) {
    return (
      <Shell>
        <p className="text-xs text-muted-foreground">
          <Link
            to="/login"
            search={{ redirect: `/movies/${movieId}` }}
            className="underline underline-offset-4"
          >
            Connectez-vous
          </Link>{" "}
          pour ajouter ce film à votre bibliothèque.
        </p>
      </Shell>
    );
  }

  if (isPending) {
    return (
      <Shell>
        <p className="text-xs text-muted-foreground">Chargement…</p>
      </Shell>
    );
  }

  if (!entry) {
    return (
      <Shell>
        <Button
          className="w-full"
          disabled={isBusy}
          onClick={() => upsert.mutate({ watched: false, rating: null })}
        >
          Ajouter à ma bibliothèque
        </Button>
      </Shell>
    );
  }

  return (
    <Shell>
      <ButtonGroup className="w-full">
        <Button
          variant={entry.watched ? "default" : "outline"}
          className="flex-1"
          disabled={isBusy}
          onClick={() =>
            upsert.mutate({ watched: true, rating: entry.rating })
          }
        >
          <EyeIcon /> Vu
        </Button>
        <Button
          variant={entry.watched ? "outline" : "default"}
          className="flex-1"
          disabled={isBusy}
          onClick={() =>
            upsert.mutate({ watched: false, rating: entry.rating })
          }
        >
          <EyeOffIcon /> Pas vu
        </Button>
      </ButtonGroup>

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Ma note</p>
        <div className="flex items-center gap-2">
          <StarRating
            value={(entry.rating ?? 0) / 2}
            maxStars={MAX_STARS}
            iconSize={18}
            onChange={(value) =>
              upsert.mutate({ watched: true, rating: value * 2 })
            }
          />
          <span className="text-xs text-muted-foreground">
            {entry.rating === null ? "—" : `${entry.rating.toFixed(1)} / 10`}
          </span>
        </div>
      </div>

      {(upsert.isError || remove.isError) && (
        <p className="text-xs text-destructive">
          La mise à jour a échoué, réessayez.
        </p>
      )}

      <div className="flex items-center justify-between">
        {entry.rating !== null ? (
          <Button
            variant="ghost"
            size="sm"
            disabled={isBusy}
            onClick={() =>
              upsert.mutate({ watched: entry.watched, rating: null })
            }
          >
            Effacer la note
          </Button>
        ) : (
          <span />
        )}
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive"
          disabled={isBusy}
          onClick={() => remove.mutate()}
        >
          Retirer
        </Button>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <Card className="py-4">
      <CardContent className="space-y-3 px-4">{children}</CardContent>
    </Card>
  );
}
