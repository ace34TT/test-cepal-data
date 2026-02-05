import Image from 'next/image';

interface FrameColor {
  id: string;
  hex: string;
  label: string;
}

interface ProductConfiguration {
  frameColors?: FrameColor[];
  lensTypes?: any[];
}

interface Product {
  id: string;
  name: string | null;
  brand: string;
  price: number;
  currency: string;
  thumbnail: string | null;
  isAvailable: boolean;
  configurations: any;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const config = product.configurations as ProductConfiguration;
  const colors = config?.frameColors || [];

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="aspect-square relative flex items-center justify-center bg-gray-100 p-4">
        {product.thumbnail ? (
          <div className="relative w-full h-full">
            <Image
              src={product.thumbnail}
              alt={product.name || 'Product Image'}
              fill
              className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="text-gray-400">No Image</div>
        )}
        {!product.isAvailable && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
      </div>
      
      <div className="p-3 flex flex-col flex-grow">
        <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
        <h2 className="text-base font-semibold text-gray-900 mb-1 truncate" title={product.name || ''}>
          {product.name}
        </h2>
        
        {/* Colors Section */}
        {colors.length > 0 && (
          <div className="flex gap-1.5 mb-2">
            {colors.map((color) => (
              <div 
                key={color.id}
                className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
                style={{ backgroundColor: color.hex }}
                title={color.label}
              />
            ))}
          </div>
        )}

        <div className="mt-auto">
          <p className="text-base font-bold text-gray-900">
            {product.price.toLocaleString()} {product.currency}
          </p>
        </div>
      </div>
    </div>
  );
}
