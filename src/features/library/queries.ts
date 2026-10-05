import { mutationOptions, queryOptions } from "@tanstack/react-query";
import {
  getMyLibraryEntryByMovieId,
  getMyLibrarySearch,
  removeMovieFromLibrary,
  upsertLibraryEntry,
} from "@/features/library/api";
import type { LibrarySearch, UpsertLibraryEntry } from "./schemas";

/** Toutes les clés partagent le préfixe `["library"]` : une seule invalidation suffit. */
export const getMyLibraryQuery = (search: LibrarySearch) =>
  queryOptions({
    queryKey: ["library", "search", search],
    queryFn: () => getMyLibrarySearch(search),
  });

export const getLibraryEntryQuery = (movieId: string) =>
  queryOptions({
    queryKey: ["library", "entry", movieId],
    queryFn: () => getMyLibraryEntryByMovieId(movieId),
  });

export const upsertLibraryEntryMutation = (movieId: string) =>
  mutationOptions({
    mutationKey: ["library", "upsert", movieId],
    mutationFn: (body: UpsertLibraryEntry) => upsertLibraryEntry(movieId, body),
  });

export const removeMovieFromLibraryMutation = (movieId: string) =>
  mutationOptions({
    mutationKey: ["library", "remove", movieId],
    mutationFn: () => removeMovieFromLibrary(movieId),
  });
