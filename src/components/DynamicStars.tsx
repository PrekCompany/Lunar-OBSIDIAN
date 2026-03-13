import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function DynamicStars({ count = 5000 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const scrollVelocity = useRef(0);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
      vel[i] = Math.random() * 0.02 + 0.01;
    }
    return [pos, vel];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    const st = ScrollTrigger.getById('main-scroll');
    if (st) {
      const vel = Math.abs(st.getVelocity());
      scrollVelocity.current = THREE.MathUtils.lerp(scrollVelocity.current, vel / 500, delta * 5);
    } else {
      scrollVelocity.current = THREE.MathUtils.lerp(scrollVelocity.current, 0, delta * 5);
    }

    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArray[i3 + 2] += velocities[i] + scrollVelocity.current;
      
      if (posArray[i3 + 2] > 50) {
        posArray[i3 + 2] = -50;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}
