import { createLink } from "@tanstack/react-router";
import { PaginationBar } from "@/components/pagination-bar";
import { PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

/**
 * Adaptateur entre la barre générique et la route `/movies`.
 *
 * Il porte les deux seuls savoirs propres à cette page : la route cible, et la
 * façon de patcher sa search. `PaginationBar`, elle, ignore tout du routeur.
 *
 * `createLink` est la réponse officielle de TanStack Router au mariage d'un
 * design system tiers avec un routeur typé : il prend un composant qui accepte
 * des props d'ancre et rend un lien TYPÉ. `to`, `search` et `disabled` sont
 * donc vérifiés à la compilation, et les props propres à shadcn (`text`) sont
 * préservées. C'est aussi ici qu'on ajoutera `preload` au prochain commit.
 */
const PreviousLink = createLink(PaginationPrevious);
const NextLink = createLink(PaginationNext);

export function MoviePagination({
  page,
  size,
  total,
}: {
  page: number;
  size: number;
  total: number;
}) {
  return (
    <PaginationBar
      page={page}
      size={size}
      total={total}
      // `search` reçoit une fonction de mise à jour : on repart des params
      // courants et on n'écrase que `page`. Les filtres (`q`, `genre`, `sort`)
      // survivent donc au changement de page sans être recopiés.
      renderPrevious={(control) => (
        <PreviousLink
          from="/movies/"
          to="/movies"
          search={(prev) => ({ ...prev, page: control.page })}
          disabled={control.disabled}
          text={control.text}
        />
      )}
      renderNext={(control) => (
        <NextLink
          from="/movies/"
          to="/movies"
          search={(prev) => ({ ...prev, page: control.page })}
          disabled={control.disabled}
          text={control.text}
        />
      )}
    />
  );
}
