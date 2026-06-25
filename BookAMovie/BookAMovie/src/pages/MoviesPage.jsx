import React, { useEffect, useState, useRef } from 'react';
import '../App.css';
import { getMoviePosterUrl, getPopularMovies } from '../services/api';

export function MoviesPage({ showHero = true }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoading(true);
        setError('');
        const results = await getPopularMovies();
        setMovies(results);
      } catch (fetchError) {
        setError('Unable to load movies right now.');
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -280, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 280, behavior: 'smooth' });
  };

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoading(true);
        setError('');
        const results = await getPopularMovies();
        setMovies(results);
      } catch (fetchError) {
        setError('Unable to load movies right now.');
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <>
      {showHero ? (
        <section className="page-hero">
          <h1>Browse popular movies</h1>
          <p>Discover trending movies and book your next cinema experience.</p>
        </section>
      ) : null}
      <section className="section">
        <h2 className="section-title">Popular Movies</h2>

        {isLoading ? <p className="section-subtitle">Loading movies...</p> : null}
        {error ? <p className="section-subtitle">{error}</p> : null}

        <div className="movies-container">
          <button className="scroll-btn left" onClick={scrollLeft}>{'🢀'}</button>

          <div className="movies-scroll" ref={scrollRef}>
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <div className="poster">
                  <img
                    src={getMoviePosterUrl(movie.poster_path)}
                    alt={`${movie.title} poster`}
                    className="poster-image"
                  />
                </div>
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <h3>Release: {movie.release_date}</h3>
                  <p>
                    Rating : {movie.vote_average?.toFixed(1) ?? 'N/A'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="scroll-btn right" onClick={scrollRight}>{'🢂'}</button>
        </div>
      </section>
    </>
  );
}
