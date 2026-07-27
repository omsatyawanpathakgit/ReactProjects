
import React from "react";
import './App.css';
import { Copyright } from '../Copyright';


export function CTA() {
    return(
        <>
            <div className="container">

                <div className="left">
                    <h2>Book Your Favorite Movie/Show</h2>

                    <p>
                        Experience the latest blockbusters with seamless online booking.
                        Choose your movie, reserve your seats, and enjoy an unforgettable
                        cinema experience with just a few clicks.
                    </p>
                </div>

                <div className="right">
                    <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600" alt="Movie"/>
                </div>

            </div>

            <Copyright />
        </>
    )
}