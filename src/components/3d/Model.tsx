'use client';

import React from 'react';
import { useGLTF } from '@react-three/drei';

interface ModelProps {
  modelUrl?: string;
  [key: string]: any;
}

export default function Model({ modelUrl = '/models/glasses_09.glb', ...props }: ModelProps) {
  const { scene } = useGLTF(modelUrl);

  return <primitive object={scene} {...props} />;
}

useGLTF.preload('/models/glasses_09.glb');
