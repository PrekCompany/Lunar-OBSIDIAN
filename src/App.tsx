import { Suspense, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import Lenis from 'lenis';
import * as THREE from 'three';

import { Moon } from './components/Moon';
import { Overlay } from './components/Overlay';
import { SceneController } from './components/SceneController';

function Starfield() {
  const ref = useRef<THREE.Points>(null);
  const velocityRef = useRef<Float32Array | null>(null);
  
  const [positions, colors] = useMemo(() => {
    const pos = [];
    const col = [];
    const vel = [];
    for (let i = 0; i < 800; i++) {
      pos.push((Math.random() - 0.5) * 1500);
      pos.push((Math.random() - 0.5) * 1500);
      pos.push((Math.random() - 0.5) * 1500);
      col.push(0.9, 0.9, 1);
      vel.push((Math.random() - 0.5) * 0.2); // x velocity
      vel.push((Math.random() - 0.5) * 0.2); // y velocity
      vel.push((Math.random() - 0.5) * 0.2); // z velocity
    }
    velocityRef.current = new Float32Array(vel);
    return [new Float32Array(pos), new Float32Array(col)];
  }, []);

  useFrame((state) => {
    if (ref.current && velocityRef.current) {
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      const velocities = velocityRef.current;
      const { x, y } = state.mouse;
      
      // Wind Effect: Particles react to mouse speed/position
      for (let i = 0; i < positions.length / 3; i++) {
        const i3 = i * 3;
        
        // Base drift
        positions[i3] += velocities[i3] + x * 0.5;
        positions[i3 + 1] += velocities[i3 + 1] + y * 0.5;
        positions[i3 + 2] += velocities[i3 + 2];

        // Boundary check
        if (Math.abs(positions[i3]) > 750) positions[i3] *= -0.9;
        if (Math.abs(positions[i3 + 1]) > 750) positions[i3 + 1] *= -0.9;
        if (Math.abs(positions[i3 + 2]) > 750) positions[i3 + 2] *= -0.9;
      }
      
      ref.current.geometry.attributes.position.needsUpdate = true;
      ref.current.rotation.y += 0.0002;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={1.2} 
        vertexColors 
        transparent 
        opacity={0.6} 
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="fixed inset-0 z-0">
        <Canvas
          dpr={window.devicePixelRatio}
          gl={{ 
            antialias: true, 
            powerPreference: "high-performance", 
            alpha: true,
            stencil: false,
            depth: true
          }}
          camera={{ fov: 45, near: 0.1, far: 2000 }}
        >
          <SceneController />
          <Suspense fallback={null}>
            <Starfield />
            <Moon />
          </Suspense>
        </Canvas>
      </div>

      {/* HTML Overlay */}
      <div className="relative z-10">
        <Overlay />
      </div>
    </div>
  );
}
