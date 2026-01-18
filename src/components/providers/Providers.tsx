'use client';

import React from 'react';
import { CartProvider } from '../../context/CartContext';
import Cart from '../organisms/Cart';
import { SettingsProvider } from '../../context/SettingsContext';
import { SettingsMetadata } from '../../types/cms';
interface ProvidersProps {
  children: React.ReactNode;
  settings?: SettingsMetadata;
}

export const Providers: React.FC<ProvidersProps> = ({ children, settings }) => {
  if (!settings) {
    return (
      <CartProvider>
        {children}
        <Cart />
      </CartProvider>
    );
  }
  
  return (
    <SettingsProvider settings={settings}>
      <CartProvider>
        {children}
        <Cart />
      </CartProvider>
    </SettingsProvider>
  );
};
