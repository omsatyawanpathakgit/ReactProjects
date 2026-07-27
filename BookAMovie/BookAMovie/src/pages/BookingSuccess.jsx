import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

export function BookingSuccess() {
  const navigate = useNavigate();

  return (
    <div className="success-page">

      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/002/887/224/small/people-are-jumping-vigorously-vector.jpg"
        alt="Booking Successful"
        className="success-image"
      />

      <p>
        Your ticket has been booked successfully.
      </p>

    <button className="primary-btn" onClick={() => navigate("/book")}>
        Book More Contents
      </button>
    </div>
  );
}