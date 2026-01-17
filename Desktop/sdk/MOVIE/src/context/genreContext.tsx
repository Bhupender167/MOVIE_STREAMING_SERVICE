import { createContext, useState } from "react";

type GenreContextType = {
  genre: number | null;
  setGenre: (data: number) => void;
};

export const GenreContext = createContext<GenreContextType>({
  genre: null,
  setGenre: () => {},
});

export const GenresProvider = ({ children }: { children: React.ReactNode }) => {
  const [genre, setGenre] = useState<number | null>(null);

  return (
    <GenreContext.Provider value={{ genre, setGenre }}>
      {children}
    </GenreContext.Provider>
  );
};
