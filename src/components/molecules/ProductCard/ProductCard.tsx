import React from 'react';
import styles from './ProductCard.module.scss';
import Button from '../../atoms/Button';
import { Product } from '../../../data/inventory';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleSell = () => {
    window.open('https://wa.me/50684196936', '_blank');
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.category}>{product.category}</div>
        <h3 className={styles.title}>{product.product}</h3>
      </div>
      <p className={styles.techSpec}>{product.tech_spec}</p>
      <div className={styles.footer}>
        <span className={styles.type}>{product.type}</span>
        <Button label="Comprar" variant="glow" onClick={handleSell} style={{ padding: '8px 16px', fontSize: '0.9rem' }} />
      </div>
    </div>
  );
};

export default ProductCard;
