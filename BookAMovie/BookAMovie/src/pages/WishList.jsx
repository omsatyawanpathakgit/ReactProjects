import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../App.css';


export function WishList() {
  const navigate = useNavigate();


  //Get all wish list items from local storage:
  const [wishList, setWishList] = useState([]);
    

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
    }

    const username = localStorage.getItem("username");
    const savedList = localStorage.getItem(`wishList_${username}`);
    
    setWishList(savedList ? JSON.parse(savedList) : []);
  }, [navigate]);  
  
  

    return (
        <section className="wish-list-page">
            <h2>Your Wish List</h2>
            {wishList.length === 0 ? (
                <p>Your wish list is empty. Start adding movies you want to watch!</p>
            ) : (
                <ul className="wish-list">  
                    {wishList.map((movie, index) => (
                        <li key={index} className="wish-list-item">
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            <h3>{movie.title}</h3>
                            <p>Release Date: {movie.release_date}</p>
                            <p>Rating: {movie.vote_average}</p>
                        </li>
                        ))}
                </ul>
            )}
        </section>
    );
}