import React, { useContext } from "react";
import { SearchResultContext } from "../../context/searchResultContext";
import useMultiSearch from "../../Hooks/useMultiSearch";
import MovieCard from "./MovieCard";
import TvShowCard from "./TvShowCard";

const SearchList = () => {
  const { searchData, searchText } = useContext(SearchResultContext);

  useMultiSearch(searchText);

  /* 🌙 Empty State */
  if (!searchText) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-400">
        <p className="text-lg">Start typing to search movies & TV shows</p>
      </div>
    );
  }

  if (!searchData || searchData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
        <p className="text-xl font-semibold">No results found</p>
        <p className="text-sm mt-2">Try a different keyword</p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-10">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Search Results
      </h2>

      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          gap-x-4
          gap-y-6
        "
      >
        {searchData.map((data) => {
          if (data.media_type === "movie") {
            return (
              <div
                key={data.id}
                className="
                  transform
                  transition
                  duration-300
                  hover:scale-105
                  hover:z-10
                "
              >
                <MovieCard movieResults={data} />
              </div>
            );
          }

          if (data.media_type === "tv") {
            return (
              <div
                key={data.id}
                className="
                  transform
                  transition
                  duration-300
                  hover:scale-105
                  hover:z-10
                "
              >
                <TvShowCard tvShowResults={data} />
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default SearchList;
