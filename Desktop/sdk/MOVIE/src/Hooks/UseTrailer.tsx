import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useTrailer = (id?: string, type?: "movie" | "tv") => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !type) return;

    const fetchTrailer = async () => {
      try {
        const res = await apiClient.get(`/${type}/${id}/videos`);
        const trailer = res.data.results.find(
          (v: any) => v.type === "Trailer" && v.site === "YouTube"
        );
        setTrailerKey(trailer?.key || null);
      } catch (err) {
        console.error("Trailer fetch failed", err);
      }
    };

    fetchTrailer();
  }, [id, type]);

  return trailerKey;
};

export default useTrailer;
