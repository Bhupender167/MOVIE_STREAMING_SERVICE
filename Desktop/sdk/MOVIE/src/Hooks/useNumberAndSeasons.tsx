import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface Season {
  season_number: number;
  episode_count: number;
}

interface TvInfo {
  number_of_seasons: number;
  number_of_episodes: number;
  seasons: Season[];
}

const useNumberAndSeasons = (tvId: string | undefined) => {
  const [info, setInfo] = useState<TvInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tvId) return;

    const fetchInfo = async () => {
      try {
        const res = await apiClient.get(`/tv/${tvId}`);
        setInfo(res.data); // ✅ correct
      } catch (error) {
        console.error("Failed to fetch TV info", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, [tvId]);

  return { info, loading };
};

export default useNumberAndSeasons;
