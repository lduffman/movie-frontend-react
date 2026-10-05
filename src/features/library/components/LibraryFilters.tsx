import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LIBRARY_SORT_OPTIONS, type LibrarySearch } from "../schemas";

const LIBRARY_SORT_LABELS: Record<
  (typeof LIBRARY_SORT_OPTIONS)[number],
  string
> = {
  "createdAt,desc": "Ajouts récents",
  "createdAt,asc": "Ajouts anciens",
  "rating,desc": "Ma note décroissante",
  "rating,asc": "Ma note croissante",
  "movie.title,asc": "Titre A → Z",
  "movie.title,desc": "Titre Z → A",
  "movie.year,desc": "Année décroissante",
  "movie.year,asc": "Année croissante",
};

const control =
  "h-9 rounded-md border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

const ANY = "__any__";

export function LibraryFilters({
  search,
  onChange,
}: {
  search: LibrarySearch;
  onChange: (patch: Partial<LibrarySearch>) => void;
}) {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <Field className="min-w-0 shrink-0 basis-36">
        <FieldLabel htmlFor="library-watched">Visionnage</FieldLabel>
        <Select
          value={search.watched === undefined ? ANY : String(search.watched)}
          onValueChange={(value) =>
            onChange({ watched: value === ANY ? undefined : value === "true" })
          }
        >
          <SelectTrigger id="library-watched" className={control}>
            <SelectValue placeholder="Tous" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Tous</SelectItem>
            <SelectItem value="true">Vus</SelectItem>
            <SelectItem value="false">À voir</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      <Field className="min-w-0 shrink-0 basis-40">
        <FieldLabel htmlFor="library-sort">Trier par</FieldLabel>
        <Select
          value={search.sort ?? ANY}
          onValueChange={(value) =>
            onChange({
              sort:
                value === ANY ? undefined : (value as LibrarySearch["sort"]),
            })
          }
        >
          <SelectTrigger id="library-sort" className={control}>
            <SelectValue placeholder="Par défaut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Par défaut</SelectItem>
            {LIBRARY_SORT_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {LIBRARY_SORT_LABELS[option]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field className="min-w-0 shrink-0 basis-24">
        <FieldLabel htmlFor="library-size">Par page</FieldLabel>
        <Select
          value={String(search.size)}
          onValueChange={(value) => onChange({ size: Number(value) })}
        >
          <SelectTrigger id="library-size" className={control}>
            <SelectValue placeholder="20" />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 50, 100].map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
}
