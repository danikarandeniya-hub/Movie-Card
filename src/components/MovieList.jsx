import { useState, useEffect } from "react";
import MovieCard from "./MovieCard.jsx";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/movies.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to load movies (${response.status})`);
        }

        const data = await response.json();
        setMovies(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchMovies();

    return () => controller.abort();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

