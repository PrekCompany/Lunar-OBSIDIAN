import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Starfield = ({ count = 5000 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = React.useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 200;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 200;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const scrollY = window.scrollY;
      pointsRef.current.position.z = scrollY * 0.1; // Tunnel effect
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#ffffff" transparent opacity={0.8} />
    </points>
  );
};
