'use client';

import React, { useState } from 'react';
import styles from './FAQ.module.scss';
import SectionTitle from '../../atoms/SectionTitle';
import AccordionItem from '../../molecules/AccordionItem';
import { useSettings } from '../../../context/SettingsContext';
import { safeDecode } from '../../../utils/textUtils';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { settings } = useSettings();

  if (!settings) return null;

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={styles.section}>
      <div className="container">
        <SectionTitle title={safeDecode(settings.faq_title)} />
        <div className={styles.wrapper}>
          {settings.faq_items.map((item, index) => (
            <AccordionItem 
              key={index}
              question={safeDecode(item.question)}
              answer={safeDecode(item.answer)}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
