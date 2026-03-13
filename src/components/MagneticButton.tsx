import { useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function MagneticButton({ children, className = "", onClick, variant = 'primary' }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);

    // Magnetic pull effect
    gsap.to(buttonRef.current, {
      x: x * 0.4,
      y: y * 0.4,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  const baseClass = variant === 'primary'
    ? 'bg-[#00ff88] text-black font-semibold shadow-[0_0_20px_rgba(0,255,136,0.4)] hover:shadow-[0_0_30px_rgba(0,255,136,0.6)]'
    : 'bg-transparent text-white border border-white/30 hover:border-white/80 hover:bg-white/5 text-shadow-strong';

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`px-8 py-4 rounded-full transition-all duration-300 ${baseClass} ${className}`}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
