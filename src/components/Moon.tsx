import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Sphere, Stars, Torus, Float } from '@react-three/drei';
import * as THREE from 'three';

function Atmosphere() {
  const vertexShader = `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  const fragmentShader = `
    varying vec3 vNormal;
    void main() {
      float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 3.0);
      gl_FragColor = vec4(0.0, 1.0, 0.53, 1.0) * intensity;
    }
  `;
  return (
    <mesh scale={[10.3, 10.3, 10.3]}>
      <sphereGeometry args={[2, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}

function Debris({ count = 40 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);
    });
    if (mesh.current) mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
    </instancedMesh>
  );
}

export function Moon() {
  const moonRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  
  const [colorMap, bumpMap] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg',
  ]);

  useEffect(() => {
    if (colorMap) {
      colorMap.anisotropy = 16;
      colorMap.minFilter = THREE.LinearMipmapLinearFilter;
      colorMap.magFilter = THREE.LinearFilter;
    }
    if (bumpMap) {
      bumpMap.anisotropy = 16;
    }
  }, [colorMap, bumpMap]);

  useFrame((state) => {
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.001;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.005;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group>
      <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade speed={1} />
      
      <directionalLight position={[50, 20, 20]} intensity={5} color="#ffffff" />
      <ambientLight intensity={0.02} />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={moonRef} args={[2, 128, 128]} scale={[10, 10, 10]}>
          <meshStandardMaterial map={colorMap} bumpMap={bumpMap} bumpScale={0.05} roughness={1} metalness={0} />
        </Sphere>
        <Atmosphere />
      </Float>

      {/* Orbital Ring */}
      <Torus ref={ringRef} args={[15, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} transparent opacity={0.3} />
      </Torus>

      <Debris />
    </group>
  );
}
