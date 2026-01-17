import React from "react";
import { Card, CardContent } from "./card";
import type { MovieResults } from "../../Hooks/UseMovie";

import { useNavigate } from "react-router-dom";

interface Props {
  movieResults: MovieResults;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movieResults }: Props) => {
  const navigate = useNavigate()
  return (
    <Card className="border-0 bg-transparent group cursor-pointer w-full max-w-[180px]" onClick={()=>navigate(`/player/${movieResults.id}`)}>
      <CardContent className="p-0 relative overflow-hidden rounded-lg aspect-[2/3]">

        {/* Poster Image */}
        <img
          src={`${IMAGE_BASE_URL}${movieResults.poster_path ?? movieResults.backdrop_path}`}
          alt={movieResults.title}
          className="w-full h-full object-cover
                     transition-transform duration-300
                     group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent
                        opacity-0 group-hover:opacity-100 transition duration-300" />

        {/* Movie Info */}
        <div className="absolute bottom-2 left-2 right-2
                        opacity-0 group-hover:opacity-100 transition duration-300">
          <h3 className="text-white text-xs font-semibold truncate">
            {movieResults.title}
          </h3>

          <div className="flex justify-between items-center text-[10px] text-gray-300 mt-1">
            <span>{movieResults.release_date?.slice(0, 4)}</span>
            <span className="text-green-400 font-semibold">
              ⭐ {movieResults.vote_average.toFixed(1)}
            </span>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default MovieCard;
