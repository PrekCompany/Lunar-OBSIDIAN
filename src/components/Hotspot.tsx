import { useState } from 'react';
import { Html } from '@react-three/drei';
import { cn } from '../utils/cn';

interface HotspotProps {
  position: [number, number, number];
  title: string;
  description: string;
}

export function Hotspot({ position, title, description }: HotspotProps) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <group position={position}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          setActive(!active);
        }}
      >
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={hovered || active ? "#ffffff" : "#888888"} />
      </mesh>
      
      {/* Glow effect */}
      <mesh scale={hovered || active ? 1.5 : 1}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>

      <Html
        position={[0, 0.2, 0]}
        center
        zIndexRange={[100, 0]}
        className={cn(
          "transition-all duration-300 pointer-events-none",
          active ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}
      >
        <div className="bg-black/80 backdrop-blur-md border border-white/20 p-4 rounded-xl w-48 text-left shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-wider">{title}</h4>
          <p className="text-white/70 text-xs leading-relaxed">{description}</p>
        </div>
      </Html>
    </group>
  );
}
