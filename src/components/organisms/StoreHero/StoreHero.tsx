import React from 'react';
import styles from './StoreHero.module.scss';
import Image from 'next/image';
import { useSettings } from '../../../context/SettingsContext';
import { safeDecode } from '../../../utils/textUtils';

const StoreHero: React.FC = () => {
  const { settings } = useSettings();

  if (!settings) return null;

  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <Image 
          src={safeDecode(settings.store_hero_image.imgix_url || settings.store_hero_image.url)} 
          alt="Luxury car detailing products" 
          fill
          priority
          style={{objectFit: 'cover'}}
        />
      </div>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>
          {safeDecode(settings.store_hero_title)} <span>{safeDecode(settings.store_hero_title_highlight)}</span>
        </h1>
        <p className={styles.subtitle}>
          {safeDecode(settings.store_hero_subtitle)}
        </p>
      </div>
    </section>
  );
};

export default StoreHero;
