'use client';

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './FloatingWhatsapp.module.scss';
import { useCart } from '../../../context/CartContext';

const FloatingWhatsapp: React.FC = () => {
  const { cart } = useCart();

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleClick = () => {
    let message = 'Hola, quisiera más información sobre sus servicios.';

    if (cart.length > 0) {
      const itemsList = cart.map(item => {
        const price = item.product.price ? `₡${formatPrice(item.product.price * item.quantity)}` : '(Consultar precio)';
        return `- ${item.quantity}x ${item.product.product} (${price})`;
      }).join('\n');

      const total = cart.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0);
      const totalString = total > 0 ? `Total: ₡${formatPrice(total)}` : '';

      message = `Hola, me gustaría ordenar los siguientes productos:

${itemsList}

${totalString}

Quedo atento a la cotización y método de pago.`;
    }

    window.open(`https://wa.me/50684196936?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className={styles.container}>
      <div className={styles.tooltip}>Cotizar ahora</div>
      <button className={styles.button} onClick={handleClick} aria-label="Contact on WhatsApp">
        <FaWhatsapp />
      </button>
    </div>
  );
};

export default FloatingWhatsapp;
