import React from 'react';
import styles from './Reviews.module.scss';
import SectionTitle from '../../atoms/SectionTitle';
import ReviewCard from '../../molecules/ReviewCard';

const reviewsData = [
  {
    name: 'Carlos Rodríguez',
    rating: 5,
    text: 'Increíble trabajo con el tratamiento cerámico. Mi auto brilla más que cuando salió de la agencia. 100% recomendados.',
  },
  {
    name: 'María Fernández',
    rating: 5,
    text: 'Excelente servicio de enderezado y pintura. No se nota para nada el golpe que tenía. Muy profesionales.',
  },
  {
    name: 'Juan Pablo',
    rating: 5,
    text: 'La atención al detalle es impresionante. El interior quedó como nuevo. Vale cada colón.',
  }
];

const Reviews: React.FC = () => {
  return (
    <section id="reviews" className={styles.section}>
      <div className="container">
        <SectionTitle title="Lo que dicen nuestros clientes" />
        <div className={styles.scrollContainer}>
          {reviewsData.map((review, index) => (
            <div key={index} className={styles.cardWrapper}>
              <ReviewCard 
                name={review.name}
                rating={review.rating}
                text={review.text}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
