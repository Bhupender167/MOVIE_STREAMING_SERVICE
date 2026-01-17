import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useNumberAndSeasons from "../../Hooks/useNumberAndSeasons";

const PlayerTv = () => {
  const { playerId } = useParams();
  const { info, loading: infoLoading } = useNumberAndSeasons(playerId);

  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [playerLoading, setPlayerLoading] = useState(true);

  if (infoLoading || !info) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-400">
        Loading show details...
      </div>
    );
  }

  const currentSeason = info.seasons.find(
    (s) => s.season_number === season
  );

  const url = `https://vidsrc-embed.ru/embed/tv/${playerId}/${season}/${episode}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0f0f0f] to-black px-4 py-10 text-white">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* 🎬 Player */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-xl">
          <div className="relative w-full aspect-video">

            {playerLoading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black">
                <div className="w-10 h-10 border-4 border-gray-600 border-t-white rounded-full animate-spin mb-4" />
                <p className="text-sm text-gray-400">
                  Loading S{season} • E{episode}
                </p>
              </div>
            )}

            <iframe
              key={`${season}-${episode}`}
              src={url}
              allowFullScreen
              className="w-full h-full"
              onLoad={() => setPlayerLoading(false)}
            />
          </div>
        </div>

        {/* 🎞 Seasons */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Seasons</h2>
          <div className="flex gap-3 flex-wrap">
            {info.seasons.map((s) => (
              <button
                key={s.season_number}
                onClick={() => {
                  setSeason(s.season_number);
                  setEpisode(1);
                  setPlayerLoading(true);
                }}
                className={`px-4 py-2 rounded-lg text-sm transition
                  ${
                    season === s.season_number
                      ? "bg-white text-black"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
              >
                Season {s.season_number}
              </button>
            ))}
          </div>
        </div>

        {/* 📺 Episodes */}
        <div>
          <h2 className="text-lg font-semibold mb-3">
            Episodes – Season {season}
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {Array.from({ length: currentSeason?.episode_count || 0 }).map(
              (_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setEpisode(i + 1);
                    setPlayerLoading(true);
                  }}
                  className={`aspect-video rounded-lg text-sm transition
                    ${
                      episode === i + 1
                        ? "bg-white text-black"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                >
                  Ep {i + 1}
                </button>
              )
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-500">
          Streaming powered by a third-party provider
        </p>
      </div>
    </div>
  );
};

export default PlayerTv;
