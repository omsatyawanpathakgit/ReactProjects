import React, { useEffect, useState, useRef } from "react";
import "../App.css";
import {
  getMoviePosterUrl,
  getPopularMovies,
  getPopularTVShows,
} from "../services/api";

export function ContentsPage({ showHero = true }) {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const movieScrollRef = useRef(null);
  const tvScrollRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError("");

        const [movieResults, tvResults] = await Promise.all([
          getPopularMovies(),
          getPopularTVShows(),
        ]);

        setMovies(movieResults);
        setTvShows(tvResults);
      } catch (err) {
        setError("Unable to load data right now.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const scrollLeft = (ref) => {
    ref.current?.scrollBy({ left: -280, behavior: "smooth" });
  };

  const scrollRight = (ref) => {
    ref.current?.scrollBy({ left: 280, behavior: "smooth" });
  };

  return (
    <>
      {showHero && (
        <section className="page-hero">
          <h1>Browse Movies & TV Shows</h1>
          <p>Discover the latest popular movies and TV series.</p>
        </section>
      )}

      {isLoading && <p className="section-subtitle">Loading...</p>}
      {error && <p className="section-subtitle">{error}</p>}

      {/* ================= MOVIES ================= */}

      <section className="section">
        <h2 className="section-title">Popular Movies</h2>

        <div className="movies-container">
          <button
            className="scroll-btn left"
            onClick={() => scrollLeft(movieScrollRef)}
          >
            🢀
          </button>

          <div className="movies-scroll" ref={movieScrollRef}>
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <div className="poster">
                  <img
                    src={getMoviePosterUrl(movie.poster_path)}
                    alt={movie.title}
                    className="poster-image"
                  />
                </div>

                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <h3>Release: {movie.release_date}</h3>
                  <p>⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            className="scroll-btn right"
            onClick={() => scrollRight(movieScrollRef)}
          >
            🢂
          </button>
        </div>
      </section>

      {/* ================= TV SHOWS ================= */}

      <section className="section">
        <h2 className="section-title">Popular TV Shows</h2>

        <div className="movies-container">
          <button
            className="scroll-btn left"
            onClick={() => scrollLeft(tvScrollRef)}
          >
            🢀
          </button>

          <div className="movies-scroll" ref={tvScrollRef}>
            {tvShows.map((show) => (
              <div key={show.id} className="movie-card">
                <div className="poster">
                  <img
                    src={getMoviePosterUrl(show.poster_path)}
                    alt={show.name}
                    className="poster-image"
                  />
                </div>

                <div className="movie-info">
                  <h3>{show.name}</h3>
                  <h3>First Air: {show.first_air_date}</h3>
                  <p>⭐ {show.vote_average?.toFixed(1) ?? "N/A"}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            className="scroll-btn right"
            onClick={() => scrollRight(tvScrollRef)}
          >
            🢂
          </button>
        </div>
      </section>
    </>
  );
}