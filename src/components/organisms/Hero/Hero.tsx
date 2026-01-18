import React from 'react';
import styles from './Hero.module.scss';
import Button from '../../atoms/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Hero: React.FC = () => {
  const router = useRouter();
  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <Image 
          src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          alt="Luxury car detailing" 
          fill
          priority
          style={{objectFit: 'cover'}}
        />
      </div>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>
          Devolvemos el <span>brillo de agencia</span> a tu vehículo
        </h1>
        <p className={styles.subtitle}>
          Protección cerámica de grado industrial, enderezado y pintura con los más altos estándares de calidad en Costa Rica.
        </p>
        <div className={styles.actions}>
          <Button label="Cotizar mi detallado ahora" variant="glow" onClick={() => window.open('https://wa.me/50684196936?text=' + encodeURIComponent('Hola, quisiera cotizar mi detallado.'), '_blank')} />
          <Button label="Ver nuestros servicios" variant="secondary" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} />
          <Button label="Ir a la Tienda" variant="primary" onClick={() => router.push('/store')} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
