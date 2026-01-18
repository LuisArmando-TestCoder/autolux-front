import React from 'react';
import styles from './Trust.module.scss';
import { Si3M } from 'react-icons/si';

const Trust: React.FC = () => {
  return (
    <section className={styles.section}>
      <h4 className={styles.title}>Trabajamos con las mejores marcas</h4>
      <div className={styles.scroller}>
        {[...Array(10)].map((_, i) => (
            <React.Fragment key={i}>
                <div className={styles.logo}><Si3M /> 3M Science. Applied to Life.™</div>
                <div className={styles.logo}>Diamond ProTech</div>
                <div className={styles.logo}>Icon Rocklear</div>
                <div className={styles.logo}>Meguiar's</div>
            </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Trust;
