import React from "react";
import { useParams } from "react-router-dom";
import useMovieDetails from "../../Hooks/UseMovieDetails";

const IMAGE_POSTER = "https://image.tmdb.org/t/p/w500";
const IMAGE_BACKDROP = "https://image.tmdb.org/t/p/w1280";

/* ---------- Types ---------- */

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

interface MovieInfo {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  tagline: string;
  genres: Genre[];
  production_companies: ProductionCompany[];
  budget: number;
  revenue: number;
  status: string;
  homepage: string;
}

/* ---------- Props ---------- */

interface MovieInfoPanelProps {
  info: MovieInfo;
}

/* ---------- Component ---------- */

const MovieInfoPanel: React.FC<MovieInfoPanelProps> = () => {
    
    
    const {infoId} = useParams();

    const {info} = useMovieDetails(infoId)
    
    
    
    return (
    <div className="min-h-screen text-black">

      {/* 🎬 Backdrop */}
      <div className="relative h-[60vh] w-full">
        <img
          src={`${IMAGE_BACKDROP}${info.backdrop_path}`}
          alt={info.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* 📽 Content */}
      <div className="relative -mt-40 px-5 md:px-12 pb-16">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Poster */}
          <div className="w-40 md:w-60 shrink-0">
            <img
              src={`${IMAGE_POSTER}${info.poster_path}`}
              alt={info.title}
              className="rounded-xl shadow-lg"
            />
          </div>

          {/* Movie Details */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-semibold">
              {info.title}
            </h1>

            {info.tagline && (
              <p className="italic text-gray-700">
                {info.tagline}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap gap-4 text-sm">
              <span>⭐ {info.vote_average.toFixed(1)}</span>
              <span>📅 {info.release_date}</span>
              <span>⏱ {info.runtime} min</span>
              <span>🎬 {info.status}</span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {info.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 rounded-full text-xs border"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <p className="leading-relaxed text-gray-800">
              {info.overview}
            </p>

            {/* Extra Info */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm mt-4">
              <div>
                <p className="font-medium">Budget</p>
                <p>${info.budget.toLocaleString()}</p>
              </div>

              <div>
                <p className="font-medium">Revenue</p>
                <p>${info.revenue.toLocaleString()}</p>
              </div>

              <div>
                <p className="font-medium">Rating</p>
                <p>{info.vote_count} votes</p>
              </div>
            </div>

            {/* Production Companies */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2">
                Production Companies
              </h3>

              <div className="flex flex-wrap gap-6">
                {info.production_companies.map((company) => (
                  <div key={company.id} className="flex items-center gap-2">
                    {company.logo_path && (
                      <img
                        src={`${IMAGE_POSTER}${company.logo_path}`}
                        alt={company.name}
                        className="h-8 object-contain"
                      />
                    )}
                    <span className="text-sm">{company.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Homepage */}
            {info.homepage && (
              <a
                href={info.homepage}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 text-sm underline"
              >
                Visit Official Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfoPanel;
