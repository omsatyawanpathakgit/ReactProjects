import React from 'react';
import { CTA } from '../CTA';
import { MoviesPage } from './MoviesPage';

export function HomePage() {
  return (
    <>
      <MoviesPage showHero={false} />
      <CTA />
    </>
  );
}
