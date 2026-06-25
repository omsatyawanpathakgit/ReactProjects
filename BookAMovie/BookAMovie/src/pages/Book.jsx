import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { getPopularMovies } from '../services/api';

export function Book() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [moviesError, setMoviesError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [seats, setSeats] = useState(1);
  const [date, setDate] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  const [wishListItems, setWishListItems] = useState(() => {
    const username = localStorage.getItem("username");
    const saved = localStorage.getItem(`wishList_${username}`);

    return saved ? JSON.parse(saved) : [];
});

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoadingMovies(true);
        setMoviesError('');
        const results = await getPopularMovies();
        setMovies(results);
        if (results.length > 0) {
          setSelectedMovie(results[0].title);
        }
      } catch (fetchError) {
        setMoviesError('Unable to load movies for booking right now.');
      } finally {
        setLoadingMovies(false);
      }
    };

    loadMovies();
  }, []);

  const wishList = (movie) => {
    const username = localStorage.getItem("username");

    if(!username){
      alert("Please login first");
      return;
    }


    const updatedList = [
      ...wishListItems,
      movie
    ];


    setWishListItems(updatedList);


    localStorage.setItem(
      `wishList_${username}`,
      JSON.stringify(updatedList)
    );


    alert(`${movie.title} added to wishlist`);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !date || !selectedMovie) {
      setConfirmation({ type: 'error', text: 'Please complete all fields to book.' });
      return;
    }

    setConfirmation({
      type: 'success',
      text: `Booked ${selectedMovie} for ${name} on ${date} - ${seats} seat(s). Confirmation sent to ${email}.`,
    });

    setName('');
    setEmail('');
    setSeats(1);
    setDate('');

    alert(`Booking Confirmed!\n\n${selectedMovie}\nName: ${name}\nEmail: ${email}\nDate: ${date}\nSeats: ${seats}`);
  };

  return (
    <section className="section book-page">
      <h2 className="section-title">Book Your Movie</h2>
      <p className="section-subtitle">Choose a movie, then complete your booking details.</p>

      <div className="book-grid">
        <aside className="book-sidebar">
          <h3>Available Movies</h3>
          {loadingMovies ? <p className="section-subtitle">Loading movies...</p> : null}
          {moviesError ? <p className="section-subtitle">{moviesError}</p> : null}

          <ul className="item-list">
            {movies.map((movie) => (
              <li
                key={movie.id}
                className={`item-list-entry ${selectedMovie === movie.title ? 'selected' : ''}`}
                onClick={() => setSelectedMovie(movie.title)}
              >
                {movie.title}
                <button onClick={() => wishList(movie)} className="wish-list-btn">
                  Add to Wish List
                </button>
              </li>
              
            ))}
          </ul>
        </aside>

        <main className="book-form-card">
          <h3 className="book-form-title">Booking Details</h3>

          <form onSubmit={handleSubmit} className="book-form">
            <label>
              Selected Movie:
              <strong>{selectedMovie || 'No movie selected'}</strong>
            </label>

            <label>
              Your Name
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter full name" />
            </label>

            <label>
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@mail.com" />
            </label>

            <label>
              Show Date
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>

            <label>
              Seats
              <input
                type="number"
                min="1"
                max="15"
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
              />
            </label>

            <button type="submit" className="primary-btn">Confirm Booking</button>

            {confirmation && (
              <div className={`booking-msg ${confirmation.type}`}>
                {confirmation.text}
              </div>
            )}
          </form>
        </main>
      </div>
    </section>
  );
}
