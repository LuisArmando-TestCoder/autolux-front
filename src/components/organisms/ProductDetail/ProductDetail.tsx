'use client';

import React from 'react';
import styles from './ProductDetail.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product } from '../../../data/inventory';
import { useCart } from '../../../context/CartContext';
import Button from '../../atoms/Button';
import AmountInput from '../../atoms/AmountInput';
import { FaChevronLeft } from 'react-icons/fa';

interface ProductDetailProps {
  product: Product;
}

const YouTubeEmbed = ({ videoId }: { videoId: string }) => (
  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%', marginTop: '1rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="YouTube video player"
    />
  </div>
);

const TextWithEmbeds = ({ text }: { text: string }) => {
  if (!text) return null;

  // Regex to find YouTube links and capture ID
  // Supports: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S+)?/g;

  const parts = [];
  let lastIndex = 0;
  let match;
  const videos: string[] = [];

  while ((match = youtubeRegex.exec(text)) !== null) {
    // Text before match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // The link
    const url = match[0];
    const videoId = match[1];
    videos.push(videoId);

    parts.push(
      <a 
        key={match.index} 
        href={url.startsWith('http') ? url : `https://${url}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ color: '#ffeb3b', textDecoration: 'underline', wordBreak: 'break-all' }}
      >
        {url}
      </a>
    );

    lastIndex = youtubeRegex.lastIndex;
  }

  // Remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return (
    <>
      <p style={{ whiteSpace: 'pre-wrap' }}>{parts.length > 0 ? parts : text}</p>
      {videos.map((id, i) => (
        <YouTubeEmbed key={id + i} videoId={id} />
      ))}
    </>
  );
};

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const router = useRouter();
  const { cart, addToCart, updateQuantity } = useCart();
  const cartItem = cart.find(item => item.product.product === product.product);

  const stock = product.stock ?? 0;
  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 10;

  const handleAdd = () => {
    if (isOutOfStock) return;
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

        <div className={styles.stockStatus}>
          {isOutOfStock ? (
             <span className={styles.outOfStock}>Agotado</span>
          ) : isLowStock ? (
             <span className={styles.lowStock}>¡Solo quedan {stock}!</span>
          ) : (
             <span className={styles.inStock}>Disponible</span>
          )}
        </div>

        <div className={styles.description}>
          <TextWithEmbeds text={product.tech_spec} />
        </div>

        <div className={styles.actions}>
          {isOutOfStock ? (
             <Button 
                label="Agotado" 
                variant="secondary" 
                onClick={() => {}} 
                style={{ padding: '12px 24px', fontSize: '1rem', width: 'auto', opacity: 0.5, cursor: 'not-allowed' }} 
             />
          ) : cartItem ? (
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

        <button 
          onClick={() => router.back()} 
          className={styles.backLink}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          <FaChevronLeft /> Volver a la tienda
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
