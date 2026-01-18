'use client';

import React from 'react';
import { CartProvider } from '../../context/CartContext';
import Cart from '../organisms/Cart';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <CartProvider>
      {children}
      <Cart />
    </CartProvider>
  );
};
