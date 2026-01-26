import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Store.module.scss';
import ProductCard from '../../molecules/ProductCard';
import Button from '../../atoms/Button';
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
  price?: number;
  product_image?: {
    url: string;
    imgix_url: string;
  };
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

interface BrandItem {
  nombre_de_marca: string;
  imagen: {
    url: string;
    imgix_url: string;
  };
}

interface BrandsResponse {
  object: {
    metadata: {
      marcas: BrandItem[];
    };
  };
}

type InventoryMasterList = Record<string, Record<string, Product[]>>;

const Store: React.FC = () => {
  const [masterList, setMasterList] = useState<InventoryMasterList>({});
  const [brands, setBrands] = useState<BrandItem[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, brandsRes] = await Promise.all([
          fetch('https://api.cosmicjs.com/v3/buckets/autolux-production/objects?pretty=true&query=%7B%22type%22:%22products%22%7D&skip=0&read_key=hXSHxMOEuwYH43zRWzbEniPSkb9u2Pltz1l8v2rdCK5UCu6cyp&depth=1&props=slug,title,metadata,type'),
          fetch('https://api.cosmicjs.com/v3/buckets/autolux-production/objects/6976f1cca2746a13db7bfbe6?pretty=true&read_key=hXSHxMOEuwYH43zRWzbEniPSkb9u2Pltz1l8v2rdCK5UCu6cyp&depth=1&props=slug,title,metadata,type')
        ]);

        const productsData: ApiResponse = await productsRes.json();
        const brandsData: BrandsResponse = await brandsRes.json();
        
        if (productsData.objects) {
          const newMasterList: InventoryMasterList = {};

          productsData.objects.forEach((obj) => {
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
              tech_spec: obj.metadata.tech_spec,
              price: obj.metadata.price,
              image: obj.metadata.product_image?.imgix_url || obj.metadata.product_image?.url
            });
          });
          
          setMasterList(newMasterList);
        }

        if (brandsData.object?.metadata?.marcas) {
          setBrands(brandsData.object.metadata.marcas);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatKey = (key: string) => {
    return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <section className={styles.section} id="store">
      <div className="container">
        <div className={styles.controlBar}>
          <div className={styles.sortDropdown}>
            <span>ORDENAR POR</span>
            <select>
              <option>Destacados</option>
              <option>A-Z</option>
              <option>Z-A</option>
            </select>
          </div>
        </div>

        {!selectedBrand ? (
          <div className={styles.brandSelection}>
            <h2 className={styles.categoryTitle}>Select a Brand</h2>
            <div className={styles.brandGrid}>
              {brands.map((brand) => (
                <div 
                  key={brand.nombre_de_marca} 
                  className={styles.brandCard}
                  onClick={() => setSelectedBrand(brand.nombre_de_marca)}
                >
                  {brand.imagen && (
                    <div className={styles.brandImageWrapper}>
                      <Image 
                        src={brand.imagen.imgix_url || brand.imagen.url} 
                        alt={brand.nombre_de_marca}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                  )}
                  <h3>{brand.nombre_de_marca}</h3>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.backButtonWrapper}>
              <Button 
                label="Back to Brands" 
                onClick={() => setSelectedBrand(null)}
                variant="secondary"
              />
            </div>
            
            <h2 className={styles.categoryTitle}>{selectedBrand}</h2>
            
            {Object.entries(masterList).map(([categoryKey, brandsMap]) => {
              const products = brandsMap[selectedBrand];
              if (!products || products.length === 0) return null;

              return (
                <div key={categoryKey} className={styles.brandSection}>
                  <h3 className={styles.brandTitle}>{formatKey(categoryKey)}</h3>
                  <div className={styles.grid}>
                    {products.map((product, index) => (
                      <div key={`${selectedBrand}-${index}`} className={styles.gridItem}>
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Store;
