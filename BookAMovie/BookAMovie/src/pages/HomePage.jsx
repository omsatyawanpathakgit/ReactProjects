import React from 'react';
import { CTA } from '../CTA';
import { ContentsPage } from './ContentsPage';

export function HomePage() {
  return (
    <>
      <ContentsPage showHero={false} />
      <CTA />
    </>
  );
}
