'use client';

import React from 'react';
import styles from './ProductDetail.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../../../data/inventory';
import { useCart } from '../../../context/CartContext';
import Button from '../../atoms/Button';
import AmountInput from '../../atoms/AmountInput';
import { FaChevronLeft } from 'react-icons/fa';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const cartItem = cart.find(item => item.product.product === product.product);

  const handleAdd = () => {
    addToCart(product, 1);
  };

  const formattedPrice = product.price 
    ? new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC', maximumFractionDigits: 0 }).format(product.price).replace('CRC', '₡')
    : 'Consultar';

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        {product.image ? (
          <Image 
            src={product.image} 
            alt={product.product} 
            fill 
            className={styles.image}
            sizes="(max-width: 900px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className={styles.placeholderImage}>No Image Available</div>
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.header}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.title}>{product.product}</h1>
          <span className={styles.type}>{product.type}</span>
        </div>

        <div className={styles.price}>
          {formattedPrice}
        </div>

        <div className={styles.description}>
          {product.tech_spec}
        </div>

        <div className={styles.actions}>
          {cartItem ? (
            <AmountInput 
              value={cartItem.quantity} 
              onChange={(val) => updateQuantity(product.product, val)} 
            />
          ) : (
            <Button 
              label="Agregar al Carrito" 
              variant="glow" 
              onClick={handleAdd} 
              style={{ padding: '12px 24px', fontSize: '1rem', width: 'auto' }} 
            />
          )}
        </div>

        <Link href="/store" className={styles.backLink}>
          <FaChevronLeft /> Volver a la tienda
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
