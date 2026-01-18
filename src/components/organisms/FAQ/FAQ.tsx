'use client';

import React, { useState } from 'react';
import styles from './FAQ.module.scss';
import SectionTitle from '../../atoms/SectionTitle';
import AccordionItem from '../../molecules/AccordionItem';

const faqData = [
  {
    question: '¿Cuánto tiempo tarda el proceso?',
    answer: 'Depende del servicio. Un lavado profundo puede tomar 4-5 horas, mientras que un tratamiento cerámico o enderezado puede requerir de 2 a 5 días para asegurar el curado y acabado perfecto.'
  },
  {
    question: '¿Tienen servicio a domicilio o es en taller?',
    answer: 'Realizamos la mayoría de servicios en nuestro taller especializado en Cartago para garantizar el ambiente controlado libre de polvo necesario para los acabados premium. Sin embargo, para evaluaciones iniciales podemos coordinar visitas.'
  },
  {
    question: '¿Qué garantía ofrecen los tratamientos cerámicos?',
    answer: 'Nuestros tratamientos cerámicos (Diamond ProTech / Icon Rocklear) cuentan con garantías certificadas que van desde 1 hasta 5 años, dependiendo del paquete elegido, cubriendo pérdida de brillo y protección hidrofóbica.'
  },
  {
    question: '¿Trabajan con seguros?',
    answer: 'Sí, trabajamos con todas las aseguradoras para los servicios de enderezado y pintura, encargándonos de los trámites y garantizando el uso de materiales de alta calidad.'
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={styles.section}>
      <div className="container">
        <SectionTitle title="Preguntas Frecuentes" />
        <div className={styles.wrapper}>
          {faqData.map((item, index) => (
            <AccordionItem 
              key={index}
              question={item.question}
              answer={item.answer}
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
