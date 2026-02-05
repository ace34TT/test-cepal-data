import React from 'react';

export function ProductCardSkeleton() {
  return (
      <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-50 flex flex-col h-full max-w-sm animate-pulse">

        {/* Zone Image Skeleton */}
        <div className="relative aspect-4/3 mb-6 bg-gray-200 rounded-4xl" />

        {/* Infos Produit Skeleton */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 pr-4">
            {/* Titre / Nom */}
            <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-2" />
            {/* Marque */}
            <div className="h-4 bg-gray-100 rounded-md w-1/2" />
          </div>

          {/* Bouton Add to Card Skeleton */}
          <div className="h-10 w-28 bg-gray-200 rounded-full shrink-0" />
        </div>

        {/* Prix Skeleton */}
        <div className="mb-6">
          <div className="h-7 bg-gray-200 rounded-md w-24" />
        </div>

        {/* Sélecteur de Couleurs Skeleton */}
        <div className="flex gap-3">
          {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white ring-1 ring-gray-50" />
          ))}
        </div>
      </div>
  );
}