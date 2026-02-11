import React from 'react';
import styles from './ProductCard.module.scss';
import Button from '../../atoms/Button';
import { Product } from '../../../data/inventory';
import { useCart } from '../../../context/CartContext';
import AmountInput from '../../atoms/AmountInput';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { cart, addToCart, updateQuantity } = useCart();
  const cartItem = cart.find(item => item.product.product === product.product);

  const stock = product.stock ?? 0;
  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 10;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, 1);
  };

  const handleCardClick = () => {
    router.push(`/store/${encodeURIComponent(product.product.trim())}`);
  };

  const formattedPrice = product.price 
    ? new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC', maximumFractionDigits: 0 }).format(product.price).replace('CRC', '₡')
    : 'Consultar';

  return (
    <div className={styles.card} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
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
        
        <div className={styles.priceTag}>
          {formattedPrice}
        </div>

        <div className={styles.footer} onClick={(e) => e.stopPropagation()}>
          <span className={styles.type}>{product.type}</span>
          
          {isOutOfStock ? (
             <div className={styles.outOfStock}>Agotado</div>
          ) : isLowStock ? (
             <div className={styles.lowStock}>¡Solo quedan {stock}!</div>
          ) : (
             <div className={styles.inStock}>Disponible</div>
          )}

          {isOutOfStock ? (
             <Button label="Agotado" variant="secondary" onClick={(e) => e.stopPropagation()} style={{ padding: '8px 16px', fontSize: '0.9rem', width: '100%', opacity: 0.5, cursor: 'not-allowed' }} />
          ) : cartItem ? (
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
