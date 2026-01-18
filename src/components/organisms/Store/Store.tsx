import React from 'react';
import styles from './Store.module.scss';
import ProductCard from '../../molecules/ProductCard';
import { inventory, Product } from '../../../data/inventory';

const Store: React.FC = () => {
  const masterList = inventory.inventory_master_list as Record<string, Record<string, Product[]>>;

  const formatKey = (key: string) => {
    return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <section className={styles.section} id="store">
      <div className="container">
        {Object.entries(masterList).map(([categoryKey, brands]) => (
          <div key={categoryKey} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{formatKey(categoryKey)}</h2>
            
            {Object.entries(brands).map(([brandKey, products]) => (
              <div key={brandKey} className={styles.brandSection}>
                <h3 className={styles.brandTitle}>{formatKey(brandKey)}</h3>
                <div className={styles.grid}>
                  {products.map((product, index) => (
                    <ProductCard key={`${brandKey}-${index}`} product={product} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Store;
