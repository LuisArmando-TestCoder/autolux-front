import React from 'react';
import styles from './Footer.module.scss';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaFacebook } from 'react-icons/fa';
import Image from 'next/image';
import { useSettings } from '../../../context/SettingsContext';
import { safeDecode } from '../../../utils/textUtils';

const Footer: React.FC = () => {
  const { settings } = useSettings();

  if (!settings) return null;

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <div className={styles.logo}>
              {settings.footer_logo ? (
                <Image 
                  src={safeDecode(settings.footer_logo.imgix_url || settings.footer_logo.url)} 
                  alt="Autolux Logo" 
                  width={150} 
                  height={50} 
                  style={{ width: 'auto', height: 'auto', maxHeight: '60px' }} 
                />
              ) : (
                <Image src="/logo.png" alt="Autolux Logo" width={150} height={50} style={{ width: 'auto', height: 'auto', maxHeight: '60px' }} />
              )}
            </div>
            <p className={styles.description}>
              {safeDecode(settings.footer_description)}
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href={settings.instagram_url} className={styles.link} target="_blank" rel="noopener noreferrer"><FaInstagram size={24} /></a>
              <a href={settings.facebook_url} className={styles.link} target="_blank" rel="noopener noreferrer"><FaFacebook size={24} /></a>
            </div>
          </div>
          
          <div>
            <h4 className={styles.heading}>Enlaces Rápidos</h4>
            {settings.footer_navigation.map((link, index) => (
              <a key={index} href={link.url} className={styles.link}>{safeDecode(link.label)}</a>
            ))}
          </div>

          <div>
            <h4 className={styles.heading}>Contacto</h4>
            <div className={styles.contactItem}>
              <FaMapMarkerAlt />
              <span>{safeDecode(settings.contact_address)}</span>
            </div>
            <div className={styles.contactItem}>
              <FaPhone />
              <span>{safeDecode(settings.contact_phone)}</span>
            </div>
            <div className={styles.contactItem}>
              <FaEnvelope />
              <span>{safeDecode(settings.contact_email)}</span>
            </div>
          </div>
          
          <div>
             <h4 className={styles.heading}>Horario</h4>
             <p>{safeDecode(settings.hours_weekdays)}</p>
             <p>{safeDecode(settings.hours_saturday)}</p>
          </div>
        </div>
        
        <div className={styles.bottom}>
          &copy; {new Date().getFullYear()} {safeDecode(settings.copyright_text)}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
