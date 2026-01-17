import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useMovieDetails = (id?: string) => {
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        const res = await apiClient.get(`/movie/${id}`);
        setInfo(res.data);
      } catch (err) {
        console.error("Movie fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  return { info, loading };
};

export default useMovieDetails;
