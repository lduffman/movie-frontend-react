import { z } from "zod";
import { movieSchema } from "@/features/movies/schemas";
import { pageSchema } from "@/lib/common.schemas";

/**
 * Liste blanche du backend (LibraryController.ALLOWED_SORT_PROPERTIES) x 2 sens.
 * Sans `sort`, le backend trie par `createdAt,desc`.
 */
export const LIBRARY_SORT_OPTIONS = [
  "createdAt,desc",
  "createdAt,asc",
  "rating,desc",
  "rating,asc",
  "movie.title,asc",
  "movie.title,desc",
  "movie.year,desc",
  "movie.year,asc",
] as const;

export const libraryEntrySchema = z.object({
  id: z.uuid(),
  movie: movieSchema,
  watched: z.boolean(),
  /** Note personnelle sur 10, distincte de la note IMDb portée par `movie.rating`. */
  rating: z.number().nullable(),
  createdAt: z.iso.datetime().optional(),
  updatedAt: z.iso.datetime().optional(),
});

export const libraryEntryPageSchema = pageSchema(libraryEntrySchema);

/** Tous les champs sont optionnels : le PUT sert autant à créer qu'à modifier. */
export const upsertLibraryEntrySchema = z.object({
  watched: z.boolean().optional(),
  rating: z.number().min(0).max(10).nullable().optional(),
});

export const librarySearchSchema = z.object({
  watched: z.boolean().optional(),
  sort: z.enum(LIBRARY_SORT_OPTIONS).optional(),
  page: z.number().int().min(0).default(0),
  size: z.number().int().min(1).max(100).default(20),
});

export type LibraryEntry = z.infer<typeof libraryEntrySchema>;
export type LibraryEntryPage = z.infer<typeof libraryEntryPageSchema>;
export type UpsertLibraryEntry = z.infer<typeof upsertLibraryEntrySchema>;

export type LibrarySearch = z.infer<typeof librarySearchSchema>;
