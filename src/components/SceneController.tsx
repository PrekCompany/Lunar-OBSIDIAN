import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SceneController() {
  const { camera } = useThree();
  const cameraRef = useRef(camera);

  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  useFrame(() => {
    camera.lookAt(0, 0, 0);
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2, // Global Stability
        }
      });

      // Initial State (Hero): Moon at Bottom-Center, acting as floor
      // Camera is high, looking down at the top of the Moon
      gsap.set(cameraRef.current.position, { x: 0, y: 15, z: 40 });
      cameraRef.current.lookAt(0, -10, 0);

      // Section 1: Moon scales up or moves down to reveal next sections
      tl.to(cameraRef.current.position, {
        x: 0,
        y: 5,
        z: 30,
        ease: 'power1.inOut',
      }, 0.2);

      // Section 2: Moon moves to the Left
      tl.to(cameraRef.current.position, {
        x: -20,
        y: 0,
        z: 50,
        ease: 'power1.inOut',
      }, 0.5);

      // Section 3: Moon moves to the Right
      tl.to(cameraRef.current.position, {
        x: 20,
        y: 0,
        z: 50,
        ease: 'power1.inOut',
      }, 0.8);

    });

    return () => ctx.revert();
  }, []);

  return null;
}
