'use client';

import React, { useState, useRef } from 'react';
import styles from './BeforeAfter.module.scss';
import Image from 'next/image';

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  alt: string;
}

const BeforeAfter: React.FC<BeforeAfterProps> = ({ beforeImage, afterImage, alt }) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const pos = ((x - rect.left) / rect.width) * 100;

    setPosition(Math.min(Math.max(pos, 0), 100));
  };

  return (
    <div 
      className={styles.container} 
      ref={containerRef}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      style={{ '--position': `${position}%` } as React.CSSProperties}
    >
      <div className={styles.imageWrapper}>
        <Image src={beforeImage} alt={`Before ${alt}`} fill sizes="(max-width: 768px) 100vw, 800px" priority />
        <span className={`${styles.label} ${styles['label--before']}`}>ANTES</span>
      </div>
      <div className={`${styles.imageWrapper} ${styles.afterImage}`}>
        <Image src={afterImage} alt={`After ${alt}`} fill sizes="(max-width: 768px) 100vw, 800px" priority />
        <span className={`${styles.label} ${styles['label--after']}`}>DESPUÉS</span>
      </div>
      <div className={styles.handle} />
    </div>
  );
};

export default BeforeAfter;
