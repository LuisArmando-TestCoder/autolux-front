import React from 'react';
import styles from './Footer.module.scss';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaFacebook } from 'react-icons/fa';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <div className={styles.logo}>
              <Image src="/logo.png" alt="Autolux Logo" width={150} height={50} style={{ width: 'auto', height: 'auto', maxHeight: '60px' }} />
            </div>
            <p className={styles.description}>
              Especialistas en enderezado, pintura y detallado automotriz de alta gama en Costa Rica.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://www.instagram.com/autoluxcostarica/" className={styles.link}><FaInstagram size={24} /></a>
              <a href="https://www.facebook.com/autoluxcostarica" className={styles.link}><FaFacebook size={24} /></a>
            </div>
          </div>
          
          <div>
            <h4 className={styles.heading}>Enlaces Rápidos</h4>
            <a href="#services" className={styles.link}>Servicios</a>
            <a href="#gallery" className={styles.link}>Galería</a>
            <a href="#faq" className={styles.link}>Preguntas Frecuentes</a>
          </div>

          <div>
            <h4 className={styles.heading}>Contacto</h4>
            <div className={styles.contactItem}>
              <FaMapMarkerAlt />
              <span>30101 Cartago Los Ángeles, V39Q+7V Cartago, Cartago Province</span>
            </div>
            <div className={styles.contactItem}>
              <FaPhone />
              <span>8419 6936</span>
            </div>
            <div className={styles.contactItem}>
              <FaEnvelope />
              <span>info@autoluxcr.com</span>
            </div>
          </div>
          
          <div>
             <h4 className={styles.heading}>Horario</h4>
             <p>Lunes - Viernes: 8:00 AM - 5:00 PM</p>
             <p>Sábado: 8:00 AM - 12:00 PM</p>
          </div>
        </div>
        
        <div className={styles.bottom}>
          &copy; {new Date().getFullYear()} AutoluX Costa Rica. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
