import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
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
  imagen?: {
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedBrand = searchParams.get('brand');

  const [masterList, setMasterList] = useState<InventoryMasterList>({});
  const [brands, setBrands] = useState<BrandItem[]>([]);
  const [extraBrands, setExtraBrands] = useState<BrandItem[]>([]);
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const updateBrandParam = (brand: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('brand', brand);
    router.push(`?${params.toString()}`);
  };

  const removeBrandParam = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('brand');
    router.push(`?${params.toString()}`);
  };

  const getProductsForBrand = (brandName: string) => {
    const products: any[] = [];
    Object.values(masterList).forEach((section) => {
      if (section[brandName]) {
        products.push(...section[brandName]);
      }
    });
    return products;
  };

  const filteredProducts = allProducts.filter(p => {
    const query = searchQuery.toLowerCase();
    return (
      p.product.toLowerCase().includes(query) ||
      p.brand?.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.type.toLowerCase().includes(query) ||
      p.tech_spec.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, brandsRes] = await Promise.all([
          fetch('https://api.cosmicjs.com/v3/buckets/autolux-production/objects?pretty=true&query=%7B%22type%22:%22products%22%7D&skip=0&read_key=hXSHxMOEuwYH43zRWzbEniPSkb9u2Pltz1l8v2rdCK5UCu6cyp&depth=1&props=slug,title,metadata,type'),
          fetch('https://api.cosmicjs.com/v3/buckets/autolux-production/objects/6976f1cca2746a13db7bfbe6?pretty=true&read_key=hXSHxMOEuwYH43zRWzbEniPSkb9u2Pltz1l8v2rdCK5UCu6cyp&depth=1&props=slug,title,metadata,type')
        ]);

        const productsData: ApiResponse = await productsRes.json();
        const brandsData: BrandsResponse = await brandsRes.json();
        
        const inferredBrandNames = new Set<string>();
        
        if (productsData.objects) {
          const newMasterList: InventoryMasterList = {};
          const productsList: Product[] = [];

          productsData.objects.forEach((obj) => {
            const brand = obj.metadata.brand.value;
            inferredBrandNames.add(brand);

            // Use product_type as the section key for dynamic grouping
            const section = obj.metadata.product_type.value;
            
            if (!newMasterList[section]) {
              newMasterList[section] = {};
            }
            if (!newMasterList[section][brand]) {
              newMasterList[section][brand] = [];
            }

            const product = {
              product: obj.title,
              category: obj.metadata.category,
              type: obj.metadata.product_type.value,
              tech_spec: obj.metadata.tech_spec,
              price: obj.metadata.price,
              image: obj.metadata.product_image?.imgix_url || obj.metadata.product_image?.url,
              brand: obj.metadata.brand.value
            };

            newMasterList[section][brand].push(product);
            productsList.push(product);
          });
          
          setMasterList(newMasterList);
          setAllProducts(productsList);
        }

        let finalBrands: BrandItem[] = [];
        if (brandsData.object?.metadata?.marcas) {
          finalBrands = [...brandsData.object.metadata.marcas];
        }

        const existingBrandNames = new Set(finalBrands.map(b => b.nombre_de_marca));
        const finalExtraBrands: BrandItem[] = [];
        
        inferredBrandNames.forEach((name) => {
          if (!existingBrandNames.has(name)) {
            finalExtraBrands.push({
              nombre_de_marca: name,
              imagen: undefined
            });
          }
        });

        setBrands(finalBrands);
        setExtraBrands(finalExtraBrands);
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
          <div className={styles.searchContainer}>
            <input 
              type="text" 
              placeholder="Buscar productos..." 
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {searchQuery ? (
          <div>
            <div className={styles.backButtonWrapper}>
              <Button 
                label="Clear Search" 
                onClick={() => setSearchQuery('')}
                variant="secondary"
              />
            </div>
            <h2 className={styles.categoryTitle}>Search Results</h2>
            <div className={styles.grid}>
              {filteredProducts.map((product, index) => (
                <div key={`search-${index}`} className={styles.gridItem}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <p style={{ textAlign: 'center', color: '#fff', fontSize: '1.2rem' }}>
                No products found matching "{searchQuery}"
              </p>
            )}
          </div>
        ) : !selectedBrand ? (
          <div className={styles.brandSelection}>
            <h2 className={styles.categoryTitle}>Select a Brand</h2>
            <div className={styles.brandGrid}>
              {brands.map((brand) => (
                <div 
                  key={brand.nombre_de_marca} 
                  className={styles.brandCard}
                  onClick={() => updateBrandParam(brand.nombre_de_marca)}
                >
                  {brand.imagen ? (
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
                  ) : (
                    <div 
                      className={styles.brandImageWrapper} 
                      style={{ 
                        minHeight: '250px', 
                        backgroundColor: '#112240',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0.8
                      }}
                    />
                  )}
                  <h3>{brand.nombre_de_marca}</h3>
                </div>
              ))}
            </div>

            {extraBrands.length > 0 && (
              <>
                <h2 className={styles.categoryTitle} style={{ marginTop: '60px' }}>More Brands</h2>
                <div className={styles.brandGrid}>
                  {extraBrands.map((brand) => (
                    <div 
                      key={brand.nombre_de_marca} 
                      className={styles.extraBrandWrapper}
                      onMouseEnter={() => setHoveredBrand(brand.nombre_de_marca)}
                      onMouseLeave={() => setHoveredBrand(null)}
                    >
                      <div 
                        className={styles.extraBrandCard}
                        onClick={() => updateBrandParam(brand.nombre_de_marca)}
                      >
                        <h3>{brand.nombre_de_marca}</h3>
                      </div>
                      
                      <div className={`${styles.expandedContent} ${hoveredBrand === brand.nombre_de_marca ? styles.visible : ''}`}>
                        {getProductsForBrand(brand.nombre_de_marca).map((product, index) => (
                          <ProductCard key={`${brand.nombre_de_marca}-product-${index}`} product={product} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div>
            <div className={styles.backButtonWrapper}>
              <Button 
                label="Back to Brands" 
                onClick={removeBrandParam}
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
