import axios from "axios";
import { api } from "@/lib/api";
import type {
  LibraryEntry,
  LibraryEntryPage,
  LibrarySearch,
  UpsertLibraryEntry,
} from "@/features/library/schemas";

export async function getMyLibrarySearch(
  search: LibrarySearch,
): Promise<LibraryEntryPage> {
  const { data } = await api.get<LibraryEntryPage>("/me/library", {
    params: search,
  });
  return data;
}

/**
 * `404` signifie « ce film n'est pas dans ma bibliothèque » : c'est une réponse
 * métier attendue, pas une erreur. On la traduit en `null`.
 */
export async function getMyLibraryEntryByMovieId(
  movieId: string,
): Promise<LibraryEntry | null> {
  try {
    const { data } = await api.get<LibraryEntry>(`/me/library/${movieId}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

/** `PUT` idempotent : même appel pour ajouter et pour modifier. */
export async function upsertLibraryEntry(
  movieId: string,
  body: UpsertLibraryEntry,
): Promise<LibraryEntry> {
  const { data } = await api.put<LibraryEntry>(`/me/library/${movieId}`, body);
  return data;
}

export async function removeMovieFromLibrary(movieId: string): Promise<void> {
  await api.delete(`/me/library/${movieId}`);
}
