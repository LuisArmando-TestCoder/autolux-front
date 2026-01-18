import React from 'react';
import styles from './Hero.module.scss';
import Button from '../../atoms/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSettings } from '../../../context/SettingsContext';
import { safeDecode } from '../../../utils/textUtils';

const Hero: React.FC = () => {
  const router = useRouter();
  const { settings } = useSettings();

  if (!settings) return null;

  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <Image
          src={safeDecode(settings.hero_image.imgix_url || settings.hero_image.url)}
          alt="Luxury car detailing"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>
          {safeDecode(settings.hero_title_part1)} 
          <br /> 
          <span>{safeDecode(settings.hero_title_highlight)}</span> 
          <br /> 
          {safeDecode(settings.hero_title_part2)}
        </h1>
        <p className={styles.subtitle}>
          {safeDecode(settings.hero_subtitle)}
        </p>
        <div className={styles.actions}>
          <Button label={safeDecode(settings.quote_button_label)} variant="glow" onClick={() => window.open(settings.quote_button_link, '_blank')} />
          <Button label={safeDecode(settings.services_button_label)} variant="secondary" onClick={() => document.getElementById(settings.services_button_anchor)?.scrollIntoView({ behavior: 'smooth' })} />
          <Button label={safeDecode(settings.store_button_label)} variant="primary" onClick={() => router.push(settings.store_button_route)} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
