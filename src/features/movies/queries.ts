import { mutationOptions, queryOptions } from "@tanstack/react-query";
import {
  createMovieComment,
  getMovie,
  getMovieComments,
  getMovieGenres,
  searchMovies,
} from "@/features/movies/api";
import type {
  CommentCreate,
  MovieCommentSearch,
  MovieSearch,
} from "@/features/movies/schemas";

export const moviesQuery = (search: MovieSearch) =>
  queryOptions({
    queryKey: ["movies", "search", search],
    queryFn: () => searchMovies(search),
  });

export const movieQuery = (movieId: string) =>
  queryOptions({
    queryKey: ["movies", "detail", movieId],
    queryFn: () => getMovie(movieId),
  });

export const movieCommentsQuery = (
  movieId: string,
  search: MovieCommentSearch,
) =>
  queryOptions({
    queryKey: ["movies", "detail", movieId, "comments", search],
    queryFn: () => getMovieComments(movieId, search),
  });

export const movieGenresQuery = () =>
  queryOptions({
    queryKey: ["movies", "genres"],
    queryFn: () => getMovieGenres(),
  });

export const createMovieCommentMutation = (movieId: string) =>
  mutationOptions({
    mutationKey: ["movies", "detail", movieId, "comments", "create"],
    mutationFn: (body: CommentCreate) => createMovieComment(movieId, body),
  });
