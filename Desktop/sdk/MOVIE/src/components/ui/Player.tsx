import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FiLoader } from "react-icons/fi";

const Player = () => {
  const { playerId } = useParams();
  const [loading, setLoading] = useState(true);

  const url = `https://vidsrc-embed.ru/embed/movie/${playerId}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0b0b] to-black flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl space-y-6">

        {/* 🎬 Player Card */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-xl
          shadow-[0_0_80px_rgba(255,255,255,0.06)] hover:shadow-[0_0_120px_rgba(255,255,255,0.1)]
          transition-all duration-500">

          {/* Aspect Ratio */}
          <div className="relative w-full aspect-video">

            {/* ⏳ Loading Overlay */}
            {loading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black">
                <FiLoader className="w-8 h-8 animate-spin text-gray-300 mb-3" />
                <p className="text-sm text-gray-400 tracking-wide">
                  Preparing movie player...
                </p>
              </div>
            )}

            {/* ▶️ Iframe */}
            <iframe
              src={url}
              title="Movie Player"
              allowFullScreen
              loading="lazy"
              className="w-full h-full"
              onLoad={() => setLoading(false)}
            />
          </div>
        </div>

        {/* 🎥 Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 px-1">
          <span>Powered by third-party streaming provider</span>
          <span className="opacity-60">HD • Fullscreen Supported</span>
        </div>
      </div>
    </div>
  );
};

export default Player;
