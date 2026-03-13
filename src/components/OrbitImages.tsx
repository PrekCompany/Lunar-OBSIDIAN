import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface OrbitProps {
  radiusX: number;
  radiusZ: number;
  duration: number;
  children: React.ReactNode;
}

const Orbit = ({ radiusX, radiusZ, duration, children }: OrbitProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime() / duration;
      groupRef.current.position.x = Math.cos(t) * radiusX;
      groupRef.current.position.z = Math.sin(t) * radiusZ;
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

interface OrbitImagesProps {
  centerContent: React.ReactNode;
  orbits: { radiusX: number; radiusZ: number; duration: number; content: React.ReactNode }[];
}

export const OrbitImages = ({ centerContent, orbits }: OrbitImagesProps) => {
  return (
    <group>
      {/* Center */}
      {centerContent}

      {/* Orbits */}
      {orbits.map((orbit, index) => (
        <Orbit key={index} {...orbit}>
          {orbit.content}
        </Orbit>
      ))}
    </group>
  );
};
