import React, { useEffect, useState } from 'react';
import styles from './Store.module.scss';
import ProductCard from '../../molecules/ProductCard';
import { Product } from '../../../data/inventory';

interface ProductMetadata {
  product_name: string;
  brand: {
    key: string;
    value: string;
  };
  category: string;
  product_type: {
    key: string;
    value: string;
  };
  tech_spec: string;
}

interface ProductObject {
  slug: string;
  title: string;
  metadata: ProductMetadata;
}

interface ApiResponse {
  objects: ProductObject[];
  total: number;
}

type InventoryMasterList = Record<string, Record<string, Product[]>>;

const Store: React.FC = () => {
  const [masterList, setMasterList] = useState<InventoryMasterList>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.cosmicjs.com/v3/buckets/autolux-production/objects?pretty=true&query=%7B%22type%22:%22products%22%7D&skip=0&read_key=hXSHxMOEuwYH43zRWzbEniPSkb9u2Pltz1l8v2rdCK5UCu6cyp&depth=1&props=slug,title,metadata,type');
        const data: ApiResponse = await response.json();
        
        if (data.objects) {
          const newMasterList: InventoryMasterList = {};

          data.objects.forEach((obj) => {
            const brand = obj.metadata.brand.value;
            // Use product_type as the section key for dynamic grouping
            const section = obj.metadata.product_type.value;
            
            if (!newMasterList[section]) {
              newMasterList[section] = {};
            }
            if (!newMasterList[section][brand]) {
              newMasterList[section][brand] = [];
            }

            newMasterList[section][brand].push({
              product: obj.title,
              category: obj.metadata.category,
              type: obj.metadata.product_type.value,
              tech_spec: obj.metadata.tech_spec
            });
          });
          
          setMasterList(newMasterList);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

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
