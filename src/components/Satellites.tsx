import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export function Satellites() {
  const satellite1Ref = useRef<THREE.Group>(null);
  const satellite2Ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (satellite1Ref.current) {
      // Orbit around the center
      const t = state.clock.elapsedTime * 0.1;
      satellite1Ref.current.position.x = Math.sin(t) * 20;
      satellite1Ref.current.position.z = Math.cos(t) * 20 - 20;
      satellite1Ref.current.rotation.y += 0.5 * delta;
      satellite1Ref.current.rotation.z += 0.2 * delta;
    }

    if (satellite2Ref.current) {
      // Orbit in a different path
      const t = state.clock.elapsedTime * 0.05 + Math.PI;
      satellite2Ref.current.position.x = Math.sin(t) * 30;
      satellite2Ref.current.position.y = Math.cos(t) * 10 - 10;
      satellite2Ref.current.position.z = Math.cos(t) * 30 - 30;
      satellite2Ref.current.rotation.x += 0.3 * delta;
      satellite2Ref.current.rotation.y += 0.1 * delta;
    }
  });

  return (
    <>
      {/* Satellite 1 (Voyager-like) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group ref={satellite1Ref}>
          {/* Main Body */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.5, 0.5, 2, 16]} />
            <meshStandardMaterial color="#dddddd" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Dish */}
          <mesh position={[0, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1.5, 0.1, 0.5, 32]} />
            <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Antenna */}
          <mesh position={[0, 2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.05, 0.05, 3, 8]} />
            <meshStandardMaterial color="#aaaaaa" metalness={1} roughness={0} />
          </mesh>
          {/* Solar Panel Left */}
          <mesh position={[-2, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
            <boxGeometry args={[0.1, 3, 1]} />
            <meshStandardMaterial color="#1133aa" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Solar Panel Right */}
          <mesh position={[2, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
            <boxGeometry args={[0.1, 3, 1]} />
            <meshStandardMaterial color="#1133aa" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      </Float>

      {/* Satellite 2 (ISS-like abstract) */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={2}>
        <group ref={satellite2Ref}>
          {/* Main Truss */}
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
            <cylinderGeometry args={[0.2, 0.2, 8, 8]} />
            <meshStandardMaterial color="#cccccc" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Modules */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.8, 0.8, 3, 16]} />
            <meshStandardMaterial color="#eeeeee" metalness={0.5} roughness={0.5} />
          </mesh>
          <mesh position={[0, 0, 1.5]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.6, 0.6, 2, 16]} />
            <meshStandardMaterial color="#dddddd" metalness={0.6} roughness={0.4} />
          </mesh>
          {/* Solar Arrays */}
          <mesh position={[-3, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[2, 0.1, 4]} />
            <meshStandardMaterial color="#2244cc" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[3, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[2, 0.1, 4]} />
            <meshStandardMaterial color="#2244cc" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      </Float>
    </>
  );
}
