import React from 'react';
import styles from './Gallery.module.scss';
import SectionTitle from '../../atoms/SectionTitle';
import BeforeAfter from '../../molecules/BeforeAfter';

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className={styles.section}>
      <div className="container">
        <SectionTitle 
          title="Resultados Reales" 
          subtitle="Transformaciones que hablan por sí mismas. Desliza para ver el antes y después." 
        />
        <BeforeAfter 
          beforeImage="/_0.png" 
          afterImage="/_1.png" 
          alt="Car paint correction" 
        />
      </div>
    </section>
  );
};

export default Gallery;
