import React from 'react';
import styles from './ProductCard.module.scss';
import Button from '../../atoms/Button';
import { Product } from '../../../data/inventory';
import { useCart } from '../../../context/CartContext';
import AmountInput from '../../atoms/AmountInput';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const cartItem = cart.find(item => item.product.product === product.product);

  const handleAdd = () => {
    addToCart(product, 1);
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
        {cartItem ? (
          <AmountInput 
            value={cartItem.quantity} 
            onChange={(val) => updateQuantity(product.product, val)} 
          />
        ) : (
          <Button label="Agregar" variant="glow" onClick={handleAdd} style={{ padding: '8px 16px', fontSize: '0.9rem' }} />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
