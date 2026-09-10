import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MovieSearch } from "@/features/movies/schemas";
import { SORT_OPTIONS } from "@/features/movies/schemas";
import { XCircleIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

const SORT_LABELS: Record<(typeof SORT_OPTIONS)[number], string> = {
  "title,asc": "Titre A → Z",
  "title,desc": "Titre Z → A",
  "year,asc": "Année croissante",
  "year,desc": "Année décroissante",
  "rating,asc": "Note croissante",
  "rating,desc": "Note décroissante",
  "runtime,asc": "Durée croissante",
  "runtime,desc": "Durée décroissante",
  "votes,asc": "Votes croissants",
  "votes,desc": "Votes décroissants",
};

const control =
  "h-9 rounded-md border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

const ANY = "__any__";

export function MovieFilters({
  search,
  onChange,
  options: { genres: optionGenres },
}: {
  search: MovieSearch;
  onChange: (patch: Partial<MovieSearch>) => void;
  options: {
    genres: string[];
  };
}) {
  const onChangeRef = useRef(onChange);
  const [queryValue, setQueryValue] = useState(search.q ?? "");
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  const pushQuery = useDebounceCallback(
    useCallback((q: string) => {
      onChangeRef.current({ q: q || undefined });
    }, []),
    300,
  );

  return (
    <div className="flex flex-wrap items-end gap-3">
      <Field className="min-w-0 grow basis-56">
        <FieldLabel htmlFor="movies-q">Recherche</FieldLabel>
        <ButtonGroup>
          <Input
            id="movies-q"
            type="search"
            value={queryValue}
            placeholder="Titre du film…"
            onChange={(e) => {
              setQueryValue(e.target.value);
              pushQuery(e.target.value);
            }}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              pushQuery.cancel();
              setQueryValue("");
              onChange({ q: undefined });
            }}
          >
            <XCircleIcon />
          </Button>
        </ButtonGroup>
      </Field>

      <Field className="min-w-0 shrink-0 basis-35">
        <FieldLabel htmlFor="movies-genre">Genre</FieldLabel>
        <Select
          value={search.genre ?? ANY}
          onValueChange={(value) =>
            onChange({ genre: value === ANY ? undefined : value })
          }
        >
          <SelectTrigger id="movies-genre" className={control}>
            <SelectValue placeholder="Action, Sci-Fi…" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Tous les genres</SelectItem>
            {optionGenres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field className="min-w-0 shrink-0 basis-40">
        <FieldLabel htmlFor="movies-sort">Trier par</FieldLabel>
        <Select
          value={search.sort ?? ANY}
          onValueChange={(value) =>
            onChange({
              sort: value === ANY ? undefined : (value as MovieSearch["sort"]),
            })
          }
        >
          <SelectTrigger id="movies-sort" className={control}>
            <SelectValue placeholder="Pertinence" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Pertinence</SelectItem>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {SORT_LABELS[option]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field className="min-w-0 shrink-0 basis-24">
        <FieldLabel htmlFor="movies-size">Par page</FieldLabel>
        <Select
          value={String(search.size)}
          onValueChange={(value) => onChange({ size: Number(value) })}
        >
          <SelectTrigger id="movies-size" className={control}>
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
