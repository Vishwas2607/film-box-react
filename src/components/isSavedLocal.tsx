import { useBookmarks } from "./bookmarkProvider";

export function useIsSavedLocal(id: string): boolean {
  const { bookmarkedMovies } = useBookmarks();
  return bookmarkedMovies.some(movie => movie.imdbID === id);
}
