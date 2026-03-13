import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

export function Astronaut() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[2, 0, 5]} scale={[0.5, 0.5, 0.5]}>
      {/* Simple Astronaut Placeholder */}
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="white" roughness={0.2} metalness={0.8} />
      </Sphere>
      <Box args={[1.5, 2, 1]} position={[0, -1.5, 0]}>
        <meshStandardMaterial color="white" roughness={0.2} metalness={0.8} />
      </Box>
    </group>
  );
}
