'use client'

import {useState} from 'react';
import Image from 'next/image';
import {Plus} from 'lucide-react';
import {formatPrice} from "@/lib/currencies";

interface FrameColor {
  id: string;
  hex: string;
  label: string;
}

interface ProductConfiguration {
  frameColors?: FrameColor[];
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

export function ProductCard({product}: { product: Product }) {
  const [imgSrc, setImgSrc] = useState(product.thumbnail || 'https://placehold.net/400x400.png');
  const config = product.configurations as ProductConfiguration;
  const colors = config?.frameColors || [];

  return (
      <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-50 flex flex-col h-full max-w-sm">
        <div className="relative aspect-4/3 mb-6 overflow-hidden rounded-4xl">
          <Image
              src={imgSrc}
              alt={product.name || 'Product'}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImgSrc('https://placehold.net/400x400.png')}
          />
          {!product.isAvailable && (
              <div
                  className="absolute top-4 right-4 bg-black/70 text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md">
                Epuisé
              </div>
          )}
        </div>

        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 pr-4">
            <h2 className="text-[#1A1A1A] text-xl font-bold leading-tight mb-1">
              {product.name}
            </h2>
            <p className="text-[#999999] text-sm font-medium uppercase tracking-wider">
              {product.brand}
            </p>
          </div>

          <button
              className="bg-[#1A1A1A] text-white rounded-full px-4 py-2 flex items-center gap-1.5 hover:bg-black transition-colors shrink-0">
            {/*<Plus size={16}/>*/}
            <span className="text-sm font-semibold">Voir</span>
          </button>
        </div>

        <div className="mb-6">
          <span className="text-[#1A1A1A] text-xl font-bold">
            {formatPrice(product.price, product.currency)}
          </span>
        </div>

        {colors.length > 0 && (
            <div className="flex gap-3">
              {colors.map((color) => (
                  <button
                      key={color.id}
                      title={color.label}
                      className="w-8 h-8 rounded-full border-2 border-white ring-1 ring-gray-100 shadow-sm transition-transform hover:scale-110"
                      style={{backgroundColor: color.hex}}
                  />
              ))}
            </div>
        )}
      </div>
  );
}