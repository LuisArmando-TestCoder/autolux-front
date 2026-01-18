'use client';

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './FloatingWhatsapp.module.scss';

const FloatingWhatsapp: React.FC = () => {
  const handleClick = () => {
    const message = 'Hola, quisiera más información sobre sus servicios.';
    window.open(`https://wa.me/50684196936?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className={styles.container}>
      <div className={styles.tooltip}>Cotizar ahora</div>
      <button className={styles.button} onClick={handleClick} aria-label="Contact on WhatsApp">
        <FaWhatsapp />
      </button>
    </div>
  );
};

export default FloatingWhatsapp;
