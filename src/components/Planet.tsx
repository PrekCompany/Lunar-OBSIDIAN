import React from 'react';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

export const Planet = ({ color, size, name }: { color: string; size: number; name: string }) => (
  <Sphere args={[size, 32, 32]}>
    <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
  </Sphere>
);
