import React from 'react';
import styles from './StoreHero.module.scss';
import Image from 'next/image';

const StoreHero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <Image 
          src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          alt="Luxury car detailing products" 
          fill
          priority
          style={{objectFit: 'cover'}}
        />
      </div>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>
          Tienda de <span>Productos Premium</span>
        </h1>
        <p className={styles.subtitle}>
          Encuentra los mejores productos para el cuidado de tu vehículo, seleccionados por nuestros expertos.
        </p>
      </div>
    </section>
  );
};

export default StoreHero;
