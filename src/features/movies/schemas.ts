import { z } from "zod";

export const movieSchema = z.object({
  id: z.uuid(),
  externalId: z.string(),
  title: z.string(),
  year: z.number().int(),
  genres: z.array(z.string()),
  rating: z.number().nullable(),
  votes: z.number().int().nullable(),
  runtime: z.number().int().nullable(),
  directors: z.array(z.string()),
  writers: z.array(z.string()),
  posterUrl: z.url().nullable(),
  plot: z.string().nullable(),
});

export const commentSchema = z.object({
  id: z.uuid(),
  movieId: z.uuid(),
  author: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.iso.datetime(),
});

export type Movie = z.infer<typeof movieSchema>;
export type Comment = z.infer<typeof commentSchema>;

export const moviePageSchema = z.object({
  items: z.array(movieSchema),
  page: z.number().int(),
  size: z.number().int(),
  total: z.number().int(),
});

export const commentPageSchema = z.object({
  items: z.array(commentSchema),
  page: z.number().int(),
  size: z.number().int(),
  total: z.number().int(),
});

export type MoviePage = z.infer<typeof moviePageSchema>;
export type CommentPage = z.infer<typeof commentPageSchema>;

/** Champs triables autorisés par le backend, x 2 sens. */
export const SORT_OPTIONS = [
  "title,asc",
  "title,desc",
  "year,asc",
  "year,desc",
  "rating,asc",
  "rating,desc",
  "runtime,asc",
  "runtime,desc",
  "votes,asc",
  "votes,desc",
] as const;

const searchText = z.union([z.string(), z.number()]).transform(String);

export const movieSearchSchema = z.object({
  q: searchText.optional(),
  genre: searchText.optional(),
  sort: z.enum(SORT_OPTIONS).optional(),
  page: z.number().int().min(0).default(0),
  size: z.number().int().min(1).max(100).default(20),
});

export const movieCommentSearchSchema = z.object({
  page: z.number().int().min(0).default(0),
  size: z.number().int().min(1).max(100).default(20),
});

export type MovieSearch = z.infer<typeof movieSearchSchema>;
export type MovieCommentSearch = z.infer<typeof movieCommentSearchSchema>;
