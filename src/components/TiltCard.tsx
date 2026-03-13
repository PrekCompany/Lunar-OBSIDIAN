import { useRef, ReactNode, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export function TiltCard({ children, className = "" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    // Entrance Animation: Emerge from Void
    gsap.fromTo(cardRef.current, 
      { 
        opacity: 0, 
        filter: 'blur(10px)', 
        scale: 0.8,
        y: 50
      },
      {
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !innerRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const centerX = width / 2;
    const centerY = height / 2;

    const rotateX = (y - centerY) / 12;
    const rotateY = (centerX - x) / 12;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: 'power2.out',
    });

    // Deep Glass Parallax Effect
    const parallaxElements = innerRef.current.querySelectorAll('.parallax-element');
    parallaxElements.forEach((el) => {
      const depth = parseFloat(el.getAttribute('data-depth') || '0.05');
      gsap.to(el, {
        x: (x - centerX) * depth,
        y: (y - centerY) * depth,
        duration: 0.5,
        ease: 'power2.out',
      });
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !innerRef.current) return;

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    const parallaxElements = innerRef.current.querySelectorAll('.parallax-element');
    gsap.to(parallaxElements, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-card relative overflow-hidden ${className}`}
      style={{ perspective: '1200px' }}
    >
      <div className="scanning-line" />
      <div ref={innerRef} className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}
