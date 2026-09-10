import { api } from "@/lib/api";
import type {
  CommentPage,
  Movie,
  MovieCommentSearch,
  MoviePage,
  MovieSearch,
} from "@/features/movies/schemas";

/** `GET /movies/search` */
export async function searchMovies(search: MovieSearch): Promise<MoviePage> {
  const { data } = await api.get<MoviePage>("/movies/search", {
    params: search,
  });
  return data;
}

/** `GET /movies/{id}` */
export async function getMovie(movieId: string): Promise<Movie> {
  const { data } = await api.get<Movie>(`/movies/${movieId}`);
  return data;
}

/** `GET /movies/{id}/comments` */
export async function getMovieComments(
  movieId: string,
  search: MovieCommentSearch,
): Promise<CommentPage> {
  const { data } = await api.get<CommentPage>(`/movies/${movieId}/comments`, {
    params: search,
  });
  return data;
}

/** `GET /movies/genres` */
export async function getMovieGenres(): Promise<string[]> {
  const { data } = await api.get<string[]>("/movies/genres");
  return data;
}
