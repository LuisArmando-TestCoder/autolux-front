'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.scss';
import Image from 'next/image';
import Button from '../../atoms/Button';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const { toggleCart, cart } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
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
          <a href="/#services" className={styles.link}>Servicios</a>
          <a href="/#gallery" className={styles.link}>Galería</a>
          <a href="/#reviews" className={styles.link}>Reseñas</a>
          <a href="/#faq" className={styles.link}>FAQ</a>
          <Link href="/store" className={styles.link}>Tienda</Link>
        </div>
        <div className={styles.cta}>
            <button className={styles.cartButton} onClick={toggleCart} aria-label="Open Cart">
              <FaShoppingCart />
              {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            </button>
            <Button label="Cotizar" variant="primary" onClick={() => window.open('https://wa.me/50684196936?text=' + encodeURIComponent('Hola, quisiera cotizar un servicio.'), '_blank')} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
