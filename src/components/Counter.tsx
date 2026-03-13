import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CounterProps {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function Counter({ value, decimals = 0, suffix = "", prefix = "", className = "" }: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obj = { val: 0 };
    
    const tl = gsap.to(obj, {
      val: value,
      duration: 2.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: elRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        setDisplayValue(obj.val);
      }
    });

    return () => {
      tl.kill();
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
    };
  }, [value]);

  const formatted = displayValue.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span 
      ref={elRef} 
      className={`font-display font-bold text-white ${className}`}
      style={{ textShadow: '0 0 15px rgba(255,255,255,0.5)' }}
    >
      {prefix}{formatted}{suffix}
    </span>
  );
}
