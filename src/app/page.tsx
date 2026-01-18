'use client';

import React from 'react';
import Navbar from '../components/organisms/Navbar';
import Hero from '../components/organisms/Hero';
import Services from '../components/organisms/Services';
import Gallery from '../components/organisms/Gallery';
import Reviews from '../components/organisms/Reviews';
import Trust from '../components/organisms/Trust';
import FAQ from '../components/organisms/FAQ';
import Footer from '../components/organisms/Footer';
import FloatingWhatsapp from '../components/atoms/FloatingWhatsapp';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Trust />
      <Services />
      <Gallery />
      <Reviews />
      <FAQ />
      <Footer />
      <FloatingWhatsapp />
    </main>
  );
}
