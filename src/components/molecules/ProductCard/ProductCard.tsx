import React from 'react';
import styles from './ProductCard.module.scss';
import Button from '../../atoms/Button';
import { Product } from '../../../data/inventory';
import { useCart } from '../../../context/CartContext';
import AmountInput from '../../atoms/AmountInput';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const cartItem = cart.find(item => item.product.product === product.product);

  const handleAdd = () => {
    addToCart(product, 1);
  };

  const formattedPrice = product.price 
    ? new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC', maximumFractionDigits: 0 }).format(product.price).replace('CRC', '₡')
    : 'Consultar';

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {product.image ? (
          <Image 
            src={product.image} 
            alt={product.product} 
            fill 
            className={styles.productImage}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className={styles.placeholderImage}>No Image</div>
        )}
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.category}>{product.category}</div>
          <h3 className={styles.title}>{product.product}</h3>
        </div>
        
        <p className={styles.techSpec}>{product.tech_spec}</p>
        
        <div className={styles.priceTag}>
          {formattedPrice}
        </div>

        <div className={styles.footer}>
          <span className={styles.type}>{product.type}</span>
          {cartItem ? (
            <AmountInput 
              value={cartItem.quantity} 
              onChange={(val) => updateQuantity(product.product, val)} 
            />
          ) : (
            <Button label="Agregar" variant="glow" onClick={handleAdd} style={{ padding: '8px 16px', fontSize: '0.9rem', width: '100%' }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
