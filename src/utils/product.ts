import { inventory, Product } from '../data/inventory';

export const getAllProducts = (): Product[] => {
  const products: Product[] = [];
  
  Object.values(inventory.inventory_master_list).forEach((categoryGroup: any) => {
    Object.values(categoryGroup).forEach((brandProducts: any) => {
      if (Array.isArray(brandProducts)) {
        products.push(...brandProducts);
      }
    });
  });
  
  return products;
};

export const findProductByName = (name: string): Product | undefined => {
  const products = getAllProducts();
  
  // Try exact match
  let found = products.find(p => p.product === name);
  if (found) return found;

  // Try trimmed match
  const trimmedName = name.trim();
  found = products.find(p => p.product.trim() === trimmedName);
  if (found) return found;

  // Try case-insensitive match
  const lowerName = trimmedName.toLowerCase();
  found = products.find(p => p.product.trim().toLowerCase() === lowerName);
  if (found) return found;

  return undefined;
};

export const fetchProductByName = async (name: string): Promise<Product | null> => {
  try {
    // Try local inventory first (faster, if it exists)
    const localProduct = findProductByName(name);
    if (localProduct) return localProduct;

    // Fetch from API
    // We try to match exact title first
    const query = JSON.stringify({
      type: "products",
      title: name.trim()
    });
    
    const url = `https://api.cosmicjs.com/v3/buckets/autolux-production/objects?pretty=true&query=${encodeURIComponent(query)}&read_key=hXSHxMOEuwYH43zRWzbEniPSkb9u2Pltz1l8v2rdCK5UCu6cyp&depth=1&props=slug,title,metadata,type`;
    
    const res = await fetch(url, { next: { revalidate: 60 } });
    const data = await res.json();
    
    if (data.objects && data.objects.length > 0) {
      const obj = data.objects[0];
      return {
        product: obj.title,
        category: obj.metadata.category,
        type: obj.metadata.product_type.value,
        tech_spec: obj.metadata.tech_spec,
        price: obj.metadata.price,
        image: obj.metadata.product_image?.imgix_url || obj.metadata.product_image?.url,
        brand: obj.metadata.brand.value
      };
    }
    
    // If not found by title, maybe try fetching all and searching (fallback for case sensitivity or partial match issues)
    // But for now, let's assume title query works or exact match is needed.
    
    return null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
