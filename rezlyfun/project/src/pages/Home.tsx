import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import WhyRezly from '../components/WhyRezly';
import CallToAction from '../components/CallToAction';

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <Pricing />
      <WhyRezly />
      <CallToAction />
    </div>
  );
}