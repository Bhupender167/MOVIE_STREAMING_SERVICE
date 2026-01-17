import React, { useContext } from "react";
import useMovieList from "../Hooks/UseMovie";
import MovieCard from "./ui/MovieCard";
import { GenreContext } from "../context/genreContext";

const MovieList = () => {
  const { genre } = useContext(GenreContext);
  const { movieList } = useMovieList(genre);

  return (
    <section className="relative px-5 md:px-10 py-10">

      {/* 🎬 Section Header */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-wide">
            Movies
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Browse movies by genre
          </p>
        </div>

        {/* Optional accent line */}
        <div className="hidden md:block h-[2px] w-24 bg-gradient-to-r from-red-600 to-transparent" />
      </div>

      {/* 🎞 Movie Grid */}
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          gap-x-4
          gap-y-8
          place-items-center
        "
      >
        {movieList?.map((movie) => (
          <div
            key={movie.id}
            className="transform transition duration-300 hover:scale-[1.04]"
          >
            <MovieCard movieResults={movie} />
          </div>
        ))}
      </div>

      {/* ⏳ Empty / Loading State */}
      {!movieList?.length && (
        <div className="flex items-center justify-center py-20 text-gray-500 text-sm">
             <div className="w-10 h-10 border-2 border-gray-600 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </section>
  );
};

export default MovieList;
