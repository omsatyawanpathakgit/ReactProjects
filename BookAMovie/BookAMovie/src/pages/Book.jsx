import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { getPopularMovies, getPopularTVShows } from "../services/api";

export function Book() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [shows, setTvShows] = useState([]);

  const [selectedMovieTitle, setSelectedMovieTitle] = useState("");
  const [selectedShowTitle, setSelectedShowTitle] = useState("");
  
  const [selectedType, setSelectedType] = useState("");

  const [loadingContent, setLoadingContent] = useState(true);
  const [contentError, setContentError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [seats, setSeats] = useState(1);
  const [date, setDate] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const [wishListItems, setWishListItems] = useState(() => {
    const username = localStorage.getItem("username");
    const saved = localStorage.getItem(`wishList_${username}`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingContent(true);
        setContentError("");

        const [movieResults, tvResults] = await Promise.all([
          getPopularMovies(),
          getPopularTVShows(),
        ]);

        setMovies(movieResults);
        setTvShows(tvResults);

        if (movieResults.length > 0) {
            setSelectedMovieTitle(movieResults[0].title);
        }

        if (tvResults.length > 0) {
            setSelectedShowTitle(tvResults[0].name);
        }
      } catch (err) {
        setContentError("Unable to load movies and TV shows.");
      } finally {
        setLoadingContent(false);
      }
    };

    loadData();
  }, []);

  const wishList = (item) => {
    const username = localStorage.getItem("username");

    if (!username) {
      alert("Please login first");
      return;
    }

    const updatedList = [...wishListItems, item];

    setWishListItems(updatedList);

    localStorage.setItem(
      `wishList_${username}`,
      JSON.stringify(updatedList)
    );

    alert(`${item.title || item.name} added to wishlist`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedTitle =
      selectedType === "Movie"
        ? selectedMovieTitle
        : selectedShowTitle;

    if (
      !name.trim() ||
      !email.trim() ||
      !date ||
      !selectedTitle
    ) {
      setConfirmation({
        type: "error",
        text: "Please complete all fields to book.",
      });
      return;
    }

    const message = `Booked ${selectedType}: ${selectedTitle} for ${name} on ${date} - ${seats} seat(s). Confirmation sent to ${email}.`;

    setConfirmation({
      type: "success",
      text: message,
    });

    alert(message);

    setName("");
    setEmail("");
    setSeats(1);
    setDate("");

    navigate("/booking-success");
  };

  return (
    <>
      <section className="section book-page">
        <h2 className="section-title">Book Your Movie</h2>

        <p className="section-subtitle">
          Choose a movie, then complete your booking details.
        </p>

        {loadingContent && (
          <p className="section-subtitle">
            Loading movies...
          </p>
        )}

        {contentError && (
          <p className="section-subtitle">{contentError}</p>
        )}

        <div className="book-grid">

          {/* MOVIES */}

          <div className="book-sidebar">
            <h3>Available Movies</h3>

            <ul className="item-list">
              {movies.map((movie) => (
                <li
                  key={movie.id}
                  className={`item-list-entry ${
                    selectedMovieTitle === movie.title ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSelectedMovieTitle(movie.title);
                    setSelectedType("Movie");
                  }}
                >
                  <span>{movie.title}</span>

                  <button
                    className="wish-list-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      wishList(movie);
                    }}
                  >
                    Add to Wish List
                  </button>
                </li>
              ))}
            </ul>
          </div>

          

          {/* BOOKING FORM */}

          <main className="book-form-card">
            <h3 className="book-form-title">Booking Details</h3>

            <form onSubmit={handleSubmit} className="book-form">

              <label>
                Selected Movie:
                <strong>
                  {selectedMovieTitle || "Nothing Selected"}
                </strong>
              </label>

              <label>
                Your Name
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  style={{ backgroundColor: "white", color: "red" }}
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com"
                  style={{ backgroundColor: "white", color: "red" }}
                />
              </label>

              <label>
                Show Date
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{ backgroundColor: "white", color: "red" }}
                />
              </label>

              <label>
                Seats
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={seats}
                  onChange={(e) =>
                    setSeats(Number(e.target.value))
                  }
                  style={{ backgroundColor: "white", color: "red" }}
                />
              </label>

              <button
                type="submit"
                className="primary-btn"
              >
                Confirm Booking
              </button>

              {confirmation && (
                <div className={`booking-msg ${confirmation.type}`}>
                  {confirmation.text}
                </div>
              )}
            </form>
          </main>

        </div>
      </section>















      <section className="section book-page">
        <h2 className="section-title">Book Your TV-Show</h2>

        <p className="section-subtitle">
          Choose a show, then complete your booking details.
        </p>

        {loadingContent && (
          <p className="section-subtitle">
            Loading shows...
          </p>
        )}

        {contentError && (
          <p className="section-subtitle">{contentError}</p>
        )}

        <div className="book-grid">

          {/* MOVIES */}

          <div className="book-sidebar">
            <h3>Available Shows</h3>

            <ul className="item-list">
              {shows.map((show) => (
                <li
                  key={show.id}
                  className={`item-list-entry ${
                    selectedShowTitle === show.name ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSelectedShowTitle(show.name);
                    setSelectedType("Show");
                  }}
                >
                  <span>{show.name}</span>

                  <button
                    className="wish-list-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      wishList(show);
                    }}
                  >
                    Add to Wish List
                  </button>
                </li>
              ))}
            </ul>
          </div>

          

          {/* BOOKING FORM */}

          <main className="book-form-card">
            <h3 className="book-form-title">Booking Details</h3>

            <form onSubmit={handleSubmit} className="book-form">

              <label>
                Selected Show:
                <strong>
                  {selectedShowTitle || "Nothing Selected"}
                </strong>
              </label>

              <label>
                Your Name
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com"
                />
              </label>

              <label>
                Show Date
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>

              <label>
                Seats
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={seats}
                  onChange={(e) =>
                    setSeats(Number(e.target.value))
                  }
                />
              </label>

              <button
                type="submit"
                className="primary-btn"
              >
                Confirm Booking
              </button>

              {confirmation && (
                <div className={`booking-msg ${confirmation.type}`}>
                  {confirmation.text}
                </div>
              )}
            </form>
          </main>

        </div>
      </section>
 
    </>
  );
}