'use client'

import { useEffect, useState } from 'react';
import { ProductCard } from "@/components/ProductCard";
import { Frame } from "@prisma/client";
import {ProductCardSkeleton} from "@/components/skeletons/ProductCardSkeleton";

export default function ProductList() {
  const [products, setProducts] = useState<Frame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/frames')
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch');
          return res.json();
        })
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(true);
          setLoading(false);
        });
  }, []);

  if (loading) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 container mx-auto pb-10">
          {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
          ))}
        </div>
    );
  }

  if (error) {
    return (
        <div className="container mx-auto py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Oups !</h2>
          <p className="text-gray-600">Impossible de charger les montures pour le moment.</p>
          <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-black text-white rounded-full"
          >
            Réessayer
          </button>
        </div>
    );
  }

  return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 container mx-auto pb-10">
        {products.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
      </div>
  );
}