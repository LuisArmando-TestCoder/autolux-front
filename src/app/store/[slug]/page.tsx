import React from 'react';
import { fetchProductByName } from '../../../utils/product';
import { safeDecode } from '../../../utils/textUtils';
import ProductDetail from '../../../components/organisms/ProductDetail/ProductDetail';
import Navbar from '../../../components/organisms/Navbar';
import Footer from '../../../components/organisms/Footer';
import FloatingWhatsapp from '../../../components/atoms/FloatingWhatsapp';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const productName = safeDecode(slug);
  const product = await fetchProductByName(productName);

  if (!product) {
    return (
      <main>
        <Navbar />
        <div style={{ padding: '8rem 2rem', textAlign: 'center', color: 'white', minHeight: '60vh' }}>
          <h1>Producto no encontrado</h1>
          <p>No pudimos encontrar el producto: {productName}</p>
        </div>
        <Footer />
        <FloatingWhatsapp />
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <ProductDetail product={product} />
      <Footer />
      <FloatingWhatsapp />
    </main>
  );
}
