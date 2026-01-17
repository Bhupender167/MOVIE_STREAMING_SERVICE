import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useNumberAndSeasons from "../../Hooks/useNumberAndSeasons";
import useTrailer from "../../Hooks/UseTrailer";

const IMAGE_POSTER = "https://image.tmdb.org/t/p/w500";
const IMAGE_BACKDROP = "https://image.tmdb.org/t/p/w1280";

const TrailerModal = ({
  trailerKey,
  onClose,
}: {
  trailerKey: string;
  onClose: () => void;
}) => {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed z-50 top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          w-[90%] max-w-3xl aspect-video
          bg-black rounded-xl overflow-hidden shadow-2xl"
      >
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
          title="Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </>
  );
};


const InfoPanel: React.FC = () => {
  const { infoId } = useParams<{ infoId: string }>();
  const navigate = useNavigate();

  const { info, loading } = useNumberAndSeasons(infoId);
  const isMovie = info && "title" in info;

 

  const trailerKey = useTrailer(infoId, isMovie ? "movie" : "tv");
  const [showTrailer, setShowTrailer] = useState(false);

  if (loading || !info) {
    return (
      <div className="flex justify-center items-center h-screen">
      <div className="w-10 h-10 border-2 border-gray-600 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const title = isMovie ? info.title : info.name;
  const date = isMovie ? info.release_date : info.first_air_date;

  const handleWatch = () => {
    navigate(isMovie ? `/player/${infoId}` : `/playerTv/${infoId}`);
  };

  return (
    <div className="min-h-screen text-black">

      {/* 🎬 Backdrop */}
      <div className="relative h-[60vh]">
        <img
          src={
            info.backdrop_path
              ? `${IMAGE_BACKDROP}${info.backdrop_path}`
              : `${IMAGE_POSTER}${info.poster_path}`
          }
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative -mt-40 px-5 md:px-12 pb-16">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Poster */}
          <div className="w-40 md:w-60 shrink-0">
            <img
              src={`${IMAGE_POSTER}${info.poster_path}`}
              alt={title}
              className="rounded-xl shadow-lg"
            />
          </div>

          {/* Info */}
          <div className="space-y-5">
            <h1 className="text-3xl md:text-4xl font-semibold">{title}</h1>

            {/* ▶ Buttons */}
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={handleWatch}
                className="px-6 py-2 rounded-lg bg-black text-white font-medium"
              >
                ▶ Watch Now
              </button>

              {trailerKey && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="px-6 py-2 rounded-lg border border-black font-medium"
                >
                  🎬 Trailer
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <span>⭐ {info.vote_average.toFixed(1)}</span>
              <span>📅 {date}</span>

              {!isMovie && (
                <>
                  <span>📺 {info.number_of_seasons} Season(s)</span>
                  <span>🎞 {info.number_of_episodes} Episodes</span>
                </>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {info.genres.map((genre: any) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 rounded-full text-xs border"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="leading-relaxed max-w-3xl">
              {info.overview}
            </p>
          </div>
        </div>

        {/* 📺 SEASONS (TV ONLY) */}
        {!isMovie && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">
              Seasons
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {info.seasons.map((season: any) => (
                <div
                  key={season.id}
                  className="rounded-xl overflow-hidden border hover:scale-105 transition cursor-pointer"
                >
                  <img
                    src={
                      season.poster_path
                        ? `${IMAGE_POSTER}${season.poster_path}`
                        : `${IMAGE_POSTER}${info.poster_path}`
                    }
                    alt={season.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <p className="font-medium">{season.name}</p>
                    <p className="text-sm">
                      {season.episode_count} Episodes
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 🎬 Trailer Modal */}
      {showTrailer && trailerKey && (
        <TrailerModal
          trailerKey={trailerKey}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </div>
  );
};

export default InfoPanel;
