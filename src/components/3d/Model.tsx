'use client';

import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { Mesh, MeshStandardMaterial } from 'three';

interface ModelProps {
  modelUrl?: string;
  color?: string;
  [key: string]: unknown;
}

export default function Model({ modelUrl = '/models/glasses_09.glb', color, ...props }: ModelProps) {
  const { scene } = useGLTF(modelUrl);

  useEffect(() => {
    if (color) {
      const frameParts = ['Object_0', 'Object_1', 'Object_5', 'Object_6'];

      scene.traverse((child) => {
        if ((child as Mesh).isMesh) {
          const mesh = child as Mesh;
          if (frameParts.includes(mesh.name)) {
            if (mesh.material instanceof MeshStandardMaterial) {
              mesh.material.color.set(color);
            }
          }
        }
      });
    }
  }, [scene, color]);

  return <primitive object={scene} {...props} />;
}

useGLTF.preload('/models/glasses_09.glb');
