import React, { useState } from "react";
import useTrendingList from "../../Hooks/useTrendingList";
import { IoMdArrowDropdown } from "react-icons/io";
import MovieCard from "../ui/MovieCard";

const TrendingMovie = () => {
  const { trendingData } = useTrendingList("movie");
  const [expand, setExpand] = useState(false);

  const visibleMovies = expand ? trendingData : trendingData?.slice(0, 10);

  return (
    <section className="relative px-5 md:px-10">

      {/* 🎬 Header */}
      <div
        className="flex items-center justify-between cursor-pointer select-none mb-6"
        onClick={() => setExpand((prev) => !prev)}
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            Trending Movies
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            What everyone is watching right now
          </p>
        </div>

        <IoMdArrowDropdown
          className={`text-3xl text-gray-400 transition-transform duration-300
            ${expand ? "rotate-180" : "rotate-0"}`}
        />
      </div>

      {/* Accent Line */}
      <div className="h-[2px] w-28 bg-gradient-to-r from-red-600 to-transparent mb-8" />

      {/* 🎞 Grid */}
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          gap-x-4
          gap-y-8
        "
      >
        {visibleMovies?.map((movie) => (
          <div
            key={movie.id}
            className="transform transition duration-300 hover:scale-[1.05] hover:z-10"
          >
            <MovieCard movieResults={movie} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingMovie;
