'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.scss';
import Image from 'next/image';
import Button from '../../atoms/Button';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setScrolled(currentScrollY > 50);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles['navbar--scrolled'] : ''} ${hidden ? styles['navbar--hidden'] : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image 
            src="/logo.png" 
            alt="Autolux Logo" 
            width={120} 
            height={40} 
            priority
            style={{ width: 'auto', height: '40px' }}
          />
        </div>
        <div className={styles.links}>
          <a href="#services" className={styles.link}>Servicios</a>
          <a href="#gallery" className={styles.link}>Galería</a>
          <a href="#reviews" className={styles.link}>Reseñas</a>
          <a href="#faq" className={styles.link}>FAQ</a>
        </div>
        <div className={styles.cta}>
            <Button label="Cotizar" variant="primary" onClick={() => window.open('https://wa.me/50684196936', '_blank')} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
