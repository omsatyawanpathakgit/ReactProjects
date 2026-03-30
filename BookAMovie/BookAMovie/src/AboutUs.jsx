import React from 'react';
import './App.css';

const highlights = [
  'Easy movie discovery and browsing',
  'Smooth booking flow with fewer steps',
  'Fast, secure, and user-friendly experience',
  'Designed for movie lovers who want convenience',
];

const values = [
  {
    title: 'Convenience',
    text: 'Book tickets anytime without standing in long queues.',
  },
  {
    title: 'Speed',
    text: 'Move from discovering a movie to confirming seats in just a few clicks.',
  },
  {
    title: 'Reliability',
    text: 'Get a clear, focused booking experience built around movies only.',
  },
];

export function AboutUs() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="about-kicker">About BookAMovie</p>
          <h1>Built for movie nights that start smoothly</h1>
          <p className="about-lead">
            BookAMovie is a movie booking platform focused on making discovery,
            selection, and ticket booking simple, fast, and enjoyable.
          </p>
        </div>
        <div className="about-hero-card">
          <h2>What we offer</h2>
          <ul className="about-list">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-grid">
        <article className="about-panel">
          <p className="about-section-label">Who We Are</p>
          <h2>One focused place for booking movies online</h2>
          <p>
            We created BookAMovie to bring convenience and entertainment
            together. Whether it is a weekend outing, a solo plan, or a family
            movie day, the platform is designed to help users find and book
            movies without friction.
          </p>
        </article>

        <article className="about-panel">
          <p className="about-section-label">Our Mission</p>
          <h2>Make movie booking feel effortless</h2>
          <p>
            Our mission is to simplify the movie-going experience with a fast,
            dependable, and easy-to-use booking journey that keeps the focus on
            cinema.
          </p>
        </article>
      </section>

      <section className="about-values">
        <div className="about-values-header">
          <p className="about-section-label">Why Choose Us</p>
          <h2>Designed around clarity, trust, and speed</h2>
        </div>

        <div className="about-values-grid">
          {values.map((value) => (
            <article key={value.title} className="about-value-card">
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-vision">
        <p className="about-section-label">Our Vision</p>
        <h2>To make every movie outing easier to plan</h2>
        <p>
          We want BookAMovie to be a dependable movie booking experience where
          users can browse, choose, and confirm tickets with confidence.
        </p>
      </section>
    </main>
  );
}
