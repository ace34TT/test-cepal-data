'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Suspense, lazy } from 'react';

const Model = lazy(() => import('./Model'));

interface SceneProps {
  modelUrl?: string;
  className?: string;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  modelScale?: number;
  modelColor?: string;
  lensColor?: string;
}

export default function Scene({ modelUrl, className, cameraPosition, cameraFov, modelScale, modelColor, lensColor }: SceneProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas shadows dpr={[1, 2] as [number, number]} camera={{ fov: cameraFov ?? 45, position: cameraPosition ?? [0, 0, 10] }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <Model modelUrl={modelUrl} scale={modelScale} color={modelColor} lensColor={lensColor} />
          </Stage>
          <OrbitControls 
             makeDefault 
             autoRotate 
             autoRotateSpeed={0.5}
             minPolarAngle={0} 
             maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
