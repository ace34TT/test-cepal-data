'use client';

import { useEffect, useState, use } from 'react';
import { Frame } from '@prisma/client';
import { formatPrice } from '@/lib/currencies';
import { ArrowLeft, Check, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('@/components/3d/Scene'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-3xl"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div></div>
});

interface FrameColor {
  id: string;
  hex: string;
  label: string;
}

interface LensType {
  id: string;
  label: string;
  price: number;
}

interface ProductConfiguration {
  frameColors?: FrameColor[];
  lensTypes?: LensType[];
}

interface Dimensions {
  width: number;
  height: number;
  bridge: number;
  unit: string;
}

interface ThreeDConfig {
  scale?: number;
  camera?: {
    fov?: number;
    position?: {
      x: number;
      y: number;
      z: number;
    };
  };
  modelUrl?: string;
}

export default function FrameDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const [product, setProduct] = useState<Frame | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedLens, setSelectedLens] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/frames/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        const config = data.configurations as ProductConfiguration;
        if (config?.frameColors?.length) {
          setSelectedColor(config.frameColors[0].id);
        }
        if (config?.lensTypes?.length) {
          setSelectedLens(config.lensTypes[0].id);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="h-8 w-32 bg-gray-200 rounded mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-square bg-gray-200 rounded-3xl"></div>
          <div className="space-y-4">
            <div className="h-10 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
            <div className="h-24 w-full bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          Retour à l&apos;accueil
        </Link>
      </div>
    );
  }

  const config = product.configurations as ProductConfiguration;
  const colors = config?.frameColors || [];
  const lensTypes = config?.lensTypes || [];

  const currentLensPrice = lensTypes.find(l => l.id === selectedLens)?.price || 0;
  const totalPrice = product.price + currentLensPrice;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-black mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Retour aux montures
        </Link>
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            <div className="bg-gray-100 h-125 lg:h-240 relative">
               <Scene 
                 className="w-full h-full"
                 modelUrl="/models/glasses_09.glb"
                 modelScale={(product.threeD as unknown as ThreeDConfig)?.scale}
                 cameraFov={(product.threeD as unknown as ThreeDConfig)?.camera?.fov}
                 cameraPosition={(product.threeD as unknown as ThreeDConfig)?.camera?.position ? [
                    (product.threeD as unknown as ThreeDConfig).camera!.position!.x,
                    (product.threeD as unknown as ThreeDConfig).camera!.position!.y,
                    (product.threeD as unknown as ThreeDConfig).camera!.position!.z
                 ] : undefined}
               />
               
               {!product.isAvailable && (
                <div className="absolute top-8 right-8 bg-black/80 text-white px-4 py-2 rounded-full uppercase tracking-widest text-sm font-bold z-10 backdrop-blur-md">
                  Épuisé
                </div>
              )}
            </div>

            <div className="p-8 lg:p-12 flex flex-col">
              <div className="mb-2 text-gray-500 uppercase tracking-widest font-semibold text-sm">
                {product.brand}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">{product.name}</h1>
              
              <div className="text-3xl font-bold text-gray-900 mb-8">
                {formatPrice(totalPrice, product.currency)}
                {currentLensPrice > 0 && <span className="text-sm font-normal text-gray-500 ml-2">(incl. verres)</span>}
              </div>

              {product.description && (
                <div className="prose prose-sm text-gray-600 mb-8">
                  <p>{product.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                {product.materials && product.materials.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Matériaux</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.materials.map((material, idx) => (
                        <span key={idx} className="text-sm font-medium text-gray-900 bg-white px-2 py-1 rounded border border-gray-100">
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {product.dimensions && (
                   <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Dimensions</h3>
                      <div className="text-sm text-gray-700 space-y-1">
                        {(product.dimensions as unknown as Dimensions).width && (
                             <div className="flex justify-between">
                               <span>Largeur:</span>
                               <span className="font-medium">{(product.dimensions as unknown as Dimensions).width} {(product.dimensions as unknown as Dimensions).unit}</span>
                             </div>
                        )}
                         {(product.dimensions as unknown as Dimensions).bridge && (
                             <div className="flex justify-between">
                               <span>Pont:</span>
                               <span className="font-medium">{(product.dimensions as unknown as Dimensions).bridge} {(product.dimensions as unknown as Dimensions).unit}</span>
                             </div>
                        )}
                         {(product.dimensions as unknown as Dimensions).height && (
                             <div className="flex justify-between">
                               <span>Hauteur:</span>
                               <span className="font-medium">{(product.dimensions as unknown as Dimensions).height} {(product.dimensions as unknown as Dimensions).unit}</span>
                             </div>
                        )}
                      </div>
                   </div>
                )}
              </div>

              <div className="space-y-8 mb-10">
                {colors.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Couleur</h3>
                    <div className="flex flex-wrap gap-3">
                      {colors.map((color) => (
                        <button
                          key={color.id}
                          onClick={() => setSelectedColor(color.id)}
                          className={`w-10 h-10 rounded-full border-2 focus:outline-none transition-all ${
                            selectedColor === color.id 
                              ? 'border-black ring-2 ring-black ring-offset-2' 
                              : 'border-transparent hover:scale-110'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.label}
                          aria-label={`Select color ${color.label}`}
                        >
                           {selectedColor === color.id && color.hex.toLowerCase() === '#ffffff' && <Check size={16} className="text-black mx-auto" />}
                           {selectedColor === color.id && color.hex.toLowerCase() !== '#ffffff' && <Check size={16} className="text-white mx-auto" />}
                        </button>
                      ))}
                    </div>
                    {selectedColor && (
                       <p className="mt-2 text-sm text-gray-500">
                         Sélectionné: <span className="font-medium text-gray-900">{colors.find(c => c.id === selectedColor)?.label}</span>
                       </p>
                    )}
                  </div>
                )}

                {lensTypes.length > 0 && (
                  <div>
                     <h3 className="text-sm font-medium text-gray-900 mb-4">Type de verres</h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {lensTypes.map((lens) => (
                          <button
                            key={lens.id}
                            onClick={() => setSelectedLens(lens.id)}
                            className={`flex justify-between items-center p-4 rounded-xl border-2 transition-all ${
                              selectedLens === lens.id
                              ? 'border-black bg-gray-50'
                              : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                             <span className="font-medium text-gray-900">{lens.label}</span>
                             <span className="text-sm text-gray-500">
                               {lens.price > 0 ? `+${formatPrice(lens.price, product.currency)}` : 'Inclus'}
                             </span>
                          </button>
                        ))}
                     </div>
                  </div>
                )}
              </div>

              <div className="mt-auto pt-8 border-t border-gray-100">
                 <button 
                  disabled={!product.isAvailable}
                  className="w-full bg-black text-white h-14 rounded-full font-bold text-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={20} />
                  {product.isAvailable ? 'Ajouter au panier' : 'Indisponible'}
                 </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
