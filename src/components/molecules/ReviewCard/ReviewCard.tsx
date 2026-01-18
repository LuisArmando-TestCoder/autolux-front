import React from 'react';
import styles from './ReviewCard.module.scss';
import { FaStar } from 'react-icons/fa';

interface ReviewCardProps {
  name: string;
  rating: number;
  text: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, rating, text }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.name}>{name}</div>
        <div className={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} color={i < rating ? '#fbbf24' : '#d1d5db'} />
          ))}
        </div>
      </div>
      <p className={styles.text}>"{text}"</p>
    </div>
  );
};

export default ReviewCard;
