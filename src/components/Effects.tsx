import { useRef, useEffect } from 'react';
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Effects() {
  const caRef = useRef<any>(null);
  const bloomRef = useRef<any>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const vel = Math.abs(self.getVelocity());
          if (caRef.current) {
            const offset = Math.min(vel / 20000, 0.01);
            gsap.to(caRef.current.offset, {
              x: offset + 0.001,
              y: offset + 0.001,
              duration: 0.2,
            });
          }
          if (bloomRef.current) {
            const intensity = 1.0 + Math.min(vel / 2000, 1.5);
            gsap.to(bloomRef.current, {
              intensity: intensity,
              duration: 0.2,
            });
          }
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <EffectComposer enableNormalPass={false}>
      <Bloom 
        ref={bloomRef}
        luminanceThreshold={0.8} 
        mipmapBlur 
        intensity={1.0} 
      />
      <ChromaticAberration 
        ref={caRef}
        blendFunction={BlendFunction.NORMAL} 
        offset={[0.001, 0.001]} 
      />
      <Noise 
        premultiply 
        blendFunction={BlendFunction.ADD} 
        opacity={0.2} 
      />
    </EffectComposer>
  );
}
