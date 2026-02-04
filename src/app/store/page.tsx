'use client';

import React, { Suspense } from 'react';
import Navbar from '../../components/organisms/Navbar';
import Footer from '../../components/organisms/Footer';
import FloatingWhatsapp from '../../components/atoms/FloatingWhatsapp';
import StoreHero from '../../components/organisms/StoreHero';
import Store from '../../components/organisms/Store';

export default function StorePage() {
  return (
    <main>
      <Navbar />
      <StoreHero />
      <Suspense fallback={<div>Loading store...</div>}>
        <Store />
      </Suspense>
      <Footer />
      <FloatingWhatsapp />
    </main>
  );
}
