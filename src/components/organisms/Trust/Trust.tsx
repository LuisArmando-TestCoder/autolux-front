import React from 'react';
import styles from './Trust.module.scss';
import { useSettings } from '../../../context/SettingsContext';
import { safeDecode } from '../../../utils/textUtils';

const Trust: React.FC = () => {
  const { settings } = useSettings();

  if (!settings) return null;

  return (
    <section className={styles.section}>
      <h4 className={styles.title}>{safeDecode(settings.trust_title)}</h4>
      <div className={styles.scroller}>
        {/* Duplicating the list to ensure smooth infinite scrolling animation if needed, 
            or just mapping once if css handles it. Assuming infinite scroll needs duplication */}
        {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
                {settings.trust_brands.map((brand, index) => (
                   <div key={`${i}-${index}`} className={styles.logo}>{safeDecode(brand)}</div>
                ))}
            </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Trust;
