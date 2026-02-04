import React, { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import styles from './Cart.module.scss';
import { useCart } from '../../../context/CartContext';
import Button from '../../atoms/Button';
import AmountInput from '../../atoms/AmountInput';
import { FaTimes } from 'react-icons/fa';

const Cart: React.FC = () => {
  const { cart, isCartOpen, toggleCart, updateQuantity, clearCart } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node) && isCartOpen) {
        toggleCart();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCartOpen, toggleCart]);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setIsGeneratingImage(true);

    try {
      if (receiptRef.current) {
        const canvas = await html2canvas(receiptRef.current, {
          scale: 2, // Higher resolution
          backgroundColor: '#ffffff',
          logging: false,
          useCORS: true
        });

        await new Promise<void>((resolve) => {
          canvas.toBlob(async (blob) => {
            if (!blob) {
              resolve();
              return;
            }

            const fileName = `pedido-autolux-${Date.now()}.png`;
            const file = new File([blob], fileName, { type: 'image/png' });
            
            const shareData = {
              title: 'Pedido Autolux',
              text: 'Hola, adjunto la imagen con el detalle de mi pedido.',
              files: [file]
            };

            let shared = false;

            // Try native sharing if supported
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
              try {
                await navigator.share(shareData);
                shared = true;
              } catch (err) {
                console.log('Share failed or canceled, falling back to download', err);
              }
            }

            if (!shared) {
              // Fallback: Download and Open WhatsApp
              const image = canvas.toDataURL('image/png');
              const link = document.createElement('a');
              link.href = image;
              link.download = fileName;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);

              const message = "Hola, adjunto la imagen con el detalle de mi pedido. Quedo atento a la confirmación y método de pago.";
              window.open(`https://wa.me/50684196936?text=${encodeURIComponent(message)}`, '_blank');
            }
            resolve();
          }, 'image/png');
        });
      }
    } catch (error) {
      console.error("Error generating receipt image:", error);
      alert("Hubo un error generando la imagen del pedido. Por favor intente de nuevo.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC', maximumFractionDigits: 0 }).format(price).replace('CRC', '₡');
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0);

  return (
    <>
      {/* Hidden Receipt for Capture */}
      <div 
        ref={receiptRef}
        style={{
          position: 'fixed',
          top: '-9999px',
          left: '-9999px',
          width: '600px',
          padding: '40px',
          backgroundColor: '#ffffff',
          color: '#000000',
          fontFamily: 'Arial, sans-serif',
          zIndex: -1
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid #000', paddingBottom: '20px' }}>
          <h1 style={{ margin: 0, fontSize: '32px', textTransform: 'uppercase' }}>Autolux</h1>
          <p style={{ margin: '10px 0 0', fontSize: '18px', color: '#666' }}>Detalle de Pedido</p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ccc' }}>
                <th style={{ textAlign: 'left', padding: '10px 0' }}>Producto</th>
                <th style={{ textAlign: 'center', padding: '10px 0' }}>Cant.</th>
                <th style={{ textAlign: 'right', padding: '10px 0' }}>Precio</th>
                <th style={{ textAlign: 'right', padding: '10px 0' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px 0' }}>
                    <div style={{ fontWeight: 'bold' }}>{item.product.product}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>{item.product.category}</div>
                  </td>
                  <td style={{ textAlign: 'center', padding: '15px 0' }}>{item.quantity}</td>
                  <td style={{ textAlign: 'right', padding: '15px 0' }}>{formatPrice(item.product.price || 0)}</td>
                  <td style={{ textAlign: 'right', padding: '15px 0' }}>
                    {formatPrice((item.product.price || 0) * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '30px', borderTop: '2px solid #000', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '14px', color: '#666' }}>
            Fecha: {new Date().toLocaleDateString()}
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '20px', fontWeight: 'bold', marginRight: '15px' }}>TOTAL:</span>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#000' }}>{formatPrice(totalAmount)}</span>
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '12px', color: '#999' }}>
          <p>Gracias por tu preferencia. Envía esta imagen por WhatsApp para procesar tu pedido.</p>
        </div>
      </div>

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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
              <Button 
                label={isGeneratingImage ? "Generando imagen..." : "Realizar Pedido"} 
                variant="glow" 
                onClick={handleCheckout} 
                disabled={isGeneratingImage}
                style={{ width: '100%' }}
              />
              <Button 
                label="Vaciar Carrito" 
                variant="secondary" 
                onClick={clearCart} 
                style={{ width: '100%' }}
              />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Cart;
