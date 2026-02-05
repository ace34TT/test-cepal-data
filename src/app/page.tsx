'use client'

import { useEffect, useState } from 'react';
import {ProductCard} from "@/components/ProductCard";
import {Frame} from "@prisma/client"; // Ton typage TypeScript

export default function ProductList() {
  const [products, setProducts] = useState<Frame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/frames')
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
  }, []);

  console.log(error)

  if (loading) return <p>Chargement des montures...</p>;
  if (error) return <p>Erreur lors du chargement.</p>;

  return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 container mx-auto">
        {products.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
      </div>
  );
}