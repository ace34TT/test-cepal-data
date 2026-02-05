import { ProductCard } from './ProductCard';

interface Product {
  id: string;
  name: string | null;
  brand: string;
  price: number;
  currency: string;
  thumbnail: string | null;
  isAvailable: boolean;
  configurations: any; // Using any for flexbility with JSON field
}

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      {products.length === 0 && (
        <div className="col-span-full text-center py-12 text-gray-500">
          No products found.
        </div>
      )}
    </div>
  );
}
