import prisma from '@/lib/prisma';
import { ProductList } from '@/components/ProductList';

export default async function ProductsPage() {
  const products = await prisma.frame.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Our Products</h1>
      <ProductList products={products} />
    </div>
  );
}
