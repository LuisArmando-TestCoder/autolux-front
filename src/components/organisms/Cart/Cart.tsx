import React, { useRef, useEffect } from 'react';
import styles from './Cart.module.scss';
import { useCart } from '../../../context/CartContext';
import Button from '../../atoms/Button';
import AmountInput from '../../atoms/AmountInput';
import { FaTimes } from 'react-icons/fa';

const Cart: React.FC = () => {
  const { cart, isCartOpen, toggleCart, updateQuantity } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node) && isCartOpen) {
        toggleCart();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCartOpen, toggleCart]);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const message = "Hola, me gustaría ordenar los siguientes productos:\n\n" +
      cart.map(item => `- ${item.quantity}x ${item.product.product}`).join('\n') +
      "\n\nQuedo atento a la cotización y método de pago.";
    
    window.open(`https://wa.me/50684196936?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      <div className={`${styles.overlay} ${isCartOpen ? styles.open : ''}`} />
      <aside ref={cartRef} className={`${styles.cart} ${isCartOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2>Tu Carrito ({cart.reduce((acc, item) => acc + item.quantity, 0)})</h2>
          <button className={styles.closeButton} onClick={toggleCart}>
            <FaTimes />
          </button>
        </div>

        <div className={styles.items}>
          {cart.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Tu carrito está vacío.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product.product} className={styles.item}>
                <div className={styles.itemInfo}>
                  <h4>{item.product.product}</h4>
                  <p>{item.product.category}</p>
                </div>
                <AmountInput 
                  value={item.quantity} 
                  onChange={(val) => updateQuantity(item.product.product, val)}
                  min={0}
                />
              </div>
            ))
          )}
        </div>

        <div className={styles.footer}>
          {cart.length > 0 && (
            <Button 
              label="Realizar Pedido" 
              variant="glow" 
              onClick={handleCheckout} 
              style={{ width: '100%' }}
            />
          )}
        </div>
      </aside>
    </>
  );
};

export default Cart;
