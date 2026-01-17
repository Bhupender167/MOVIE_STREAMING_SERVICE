import React from "react";
import { Card, CardContent } from "./card";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const TvShowCard = ({ tvShowResults }) => {

  const navigate = useNavigate()

  return (
    <Card className="border-0 bg-transparent group cursor-pointer w-full max-w-[160px] sm:max-w-[180px]" onClick={()=>navigate(`/infoPanel/${tvShowResults.id}`)}>
      <CardContent className="p-0 relative overflow-hidden rounded-xl aspect-[2/3]">

        {/* Poster */}
        <img
          src={
            tvShowResults.poster_path
              ? `${IMAGE_BASE_URL}${tvShowResults.poster_path}`
              : `${IMAGE_BASE_URL}${tvShowResults.backdrop_path}`
          }
          alt={tvShowResults.name}
          className="w-full h-full object-cover
                     transition-transform duration-300 ease-out
                     group-hover:scale-110"
        />

        {/* Dark Gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-t
                     from-black/90 via-black/40 to-transparent
                     opacity-0 group-hover:opacity-100
                     transition duration-300"
        />

        {/* Info */}
        <div
          className="absolute bottom-2 left-2 right-2
                     opacity-0 group-hover:opacity-100
                     transition duration-300"
        >
          <h3 className="text-white text-xs font-semibold truncate">
            {tvShowResults.name}
          </h3>

          <div className="flex justify-between items-center text-[10px] text-gray-300 mt-1">
            <span>
              {tvShowResults.first_air_date?.slice(0, 4)}
            </span>
            <span className="text-green-400 font-semibold">
              ⭐ {tvShowResults.vote_average.toFixed(1)}
            </span>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default TvShowCard;
