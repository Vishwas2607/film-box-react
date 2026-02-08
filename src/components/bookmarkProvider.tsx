import { createContext,useContext } from "react";
import type { BookmarkType } from "./generateCard";
import useLocalStorage from "./uselocalstorage";
import { useToastContext } from "../toast/toastProvider";


interface BookmarkContextType {
  bookmarkedMovies: BookmarkType[];
  toggleBookmark: (value:BookmarkType) => void;
}


const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookmarkedMovies, setBookmarkedMovies] = useLocalStorage<BookmarkType[]>("bookmarked", []);
  const {showToasts} = useToastContext();

  const toggleBookmark = (movieToToggle: BookmarkType) => {
    if(bookmarkedMovies.some(movie=> movie.imdbID === movieToToggle.imdbID)) {
      setBookmarkedMovies(bookmarkedMovies.filter(movie=> movie.imdbID !== movieToToggle.imdbID))
      showToasts({message:"Removed from watchlist", type: "info", duration:3000});
    } else {
      const allMovies = [...bookmarkedMovies,movieToToggle];
      setBookmarkedMovies(allMovies);
      showToasts({message:"Added to watchlist", type: "success", duration:3000});
    }
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedMovies, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};