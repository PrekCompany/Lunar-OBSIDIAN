import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Orbit, Wind, Zap, Infinity, Orbit as OrbitIcon, Rocket, Shield, Cpu, BarChart3, Layers, Target, ChevronRight } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { Counter } from './Counter';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

function RevealText({ children, className = "" }: { children: string, className?: string }) {
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!elRef.current) return;
    
    const chars = elRef.current.querySelectorAll('.reveal-char');
    gsap.to(chars, {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      stagger: 0.02,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elRef.current,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      }
    });
  }, []);

  return (
    <span ref={elRef} className={`inline-block ${className}`}>
      {children.split('').map((char, i) => (
        <span key={i} className="reveal-char">{char === ' ' ? '\u00A0' : char}</span>
      ))}
    </span>
  );
}

export function Overlay() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative z-10 w-full pointer-events-none">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-black" />
          </div>
          <span className="font-display font-bold tracking-tighter text-xl text-shadow-strong">LUNAR OBSIDIAN</span>
        </div>
        <nav className="hidden md:flex items-center gap-10">
          {['Missions', 'Technology', 'Roadmap', 'Stats'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-xs uppercase tracking-[0.2em] text-white/80 hover:text-[#00ff88] transition-colors cursor-pointer text-shadow-strong"
            >
              {item}
            </button>
          ))}
          <MagneticButton variant="primary" className="!py-2 !px-6 text-sm ml-4" onClick={() => scrollTo('contact')}>
            Sign Up
          </MagneticButton>
        </nav>
      </header>

      {/* Section 1: Hero */}
      <section id="hero" className="h-screen flex flex-col items-center justify-start pt-[20vh] px-6 relative z-40">
        <div className="text-center pointer-events-auto">
          <h1 className="text-7xl md:text-[10rem] font-display font-bold tracking-tighter text-white mb-4 leading-none text-shadow-strong">
            <RevealText>LUNAR</RevealText>
            <br />
            <RevealText>OBSIDIAN</RevealText>
          </h1>
          <p className="text-sm md:text-xl font-medium tracking-[0.2em] text-white uppercase mb-12 text-shadow-strong">
            <RevealText>The Next Frontier of Digital Experience</RevealText>
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <MagneticButton variant="primary" onClick={() => scrollTo('missions')}>
              Launch Mission
            </MagneticButton>
            <MagneticButton variant="secondary" onClick={() => scrollTo('technology')}>
              Explore Tech
            </MagneticButton>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white font-bold text-shadow-strong">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* Section 2: Missions (Services) */}
      <section id="missions" className="min-h-screen flex flex-col justify-center px-8 md:px-24 py-32 relative z-40">
        <div className="max-w-3xl mb-20 pointer-events-auto">
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 text-white text-shadow-strong">
            <RevealText>CORE SYSTEMS</RevealText>
          </h2>
          <p className="text-lg md:text-xl text-white max-w-xl leading-relaxed text-shadow-strong">
            We build the infrastructure that powers the future of lunar habitation and deep space research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl pointer-events-auto">
          {[
            { title: 'Neural Uplink', desc: 'Direct neural interface for seamless control of remote lunar assets.', icon: Cpu },
            { title: 'Quantum Shield', desc: 'Multi-layer electromagnetic protection against solar radiation.', icon: Shield },
            { title: 'Propulsion X', desc: 'Next-gen ion engines for rapid interstellar transit.', icon: Rocket }
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <TiltCard key={i} className="p-10">
                <div className="w-14 h-14 rounded-xl bg-[#00ff88]/10 flex items-center justify-center mb-8 border border-[#00ff88]/30 parallax-element" data-depth="0.08">
                  <Icon className="w-7 h-7 text-[#00ff88]" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-4 text-white parallax-element text-shadow-strong" data-depth="0.05">{card.title}</h3>
                <p className="text-white/90 leading-relaxed text-sm parallax-element text-shadow-strong" data-depth="0.03">{card.desc}</p>
                <button className="mt-8 flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#00ff88] hover:text-white transition-colors group parallax-element" data-depth="0.02">
                  Learn More <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </TiltCard>
            );
          })}
        </div>
      </section>

      {/* Section 3: Stats */}
      <section id="stats" className="min-h-screen flex items-center justify-end px-8 md:px-24 py-32 relative z-40">
        <TiltCard className="w-full max-w-3xl p-16 pointer-events-auto">
          <div className="text-right">
            <h2 className="text-6xl md:text-8xl font-display font-bold mb-12 text-white parallax-element text-shadow-strong" data-depth="0.06">
              <RevealText>METRICS</RevealText>
            </h2>
            <div className="grid grid-cols-2 gap-16 border-t border-white/20 pt-12 parallax-element" data-depth="0.04">
              {[
                { label: 'Active Missions', value: 142, decimals: 0, suffix: '', icon: Target },
                { label: 'Data Streamed', value: 4.2, decimals: 1, suffix: ' PB', icon: BarChart3 },
                { label: 'Personnel', value: 12400, decimals: 0, suffix: '', icon: Globe },
                { label: 'Uptime', value: 99.99, decimals: 2, suffix: '%', icon: Infinity }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-end">
                  <stat.icon className="w-6 h-6 text-[#00ff88] mb-3" />
                  <Counter 
                    value={stat.value} 
                    decimals={stat.decimals} 
                    suffix={stat.suffix} 
                    className="text-5xl md:text-6xl font-display font-bold text-white text-shadow-strong"
                  />
                  <span className="text-white uppercase tracking-[0.2em] text-[10px] mt-2 font-bold text-shadow-strong">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </TiltCard>
      </section>

      {/* Section 4: Roadmap */}
      <section id="roadmap" className="min-h-screen flex flex-col justify-center px-8 md:px-24 py-32 relative z-40">
        <div className="max-w-3xl mb-20 pointer-events-auto">
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 text-white text-shadow-strong">
            <RevealText>ROADMAP</RevealText>
          </h2>
          <p className="text-lg md:text-xl text-white max-w-xl leading-relaxed text-shadow-strong">
            Our strategic timeline for lunar colonization and interstellar expansion.
          </p>
        </div>

        <div className="space-y-10 w-full max-w-5xl pointer-events-auto">
          {[
            { phase: '01', title: 'Lunar Base Alpha', desc: 'Establishment of the first permanent habitat on the lunar south pole.' },
            { phase: '02', title: 'Helium-3 Mining', desc: 'Deployment of automated harvesters for clean energy production.' },
            { phase: '03', title: 'Mars Gateway', desc: 'Construction of the orbital shipyard for the first crewed Mars mission.' }
          ].map((item, i) => (
            <TiltCard key={i} className="p-10 flex flex-col md:flex-row gap-10 items-start md:items-center group">
              <div className="text-6xl font-display font-black text-white/20 group-hover:text-[#00ff88] transition-colors parallax-element" data-depth="0.1">{item.phase}</div>
              <div className="flex-1 parallax-element" data-depth="0.05">
                <h3 className="text-2xl font-display font-bold mb-3 text-white text-shadow-strong">{item.title}</h3>
                <p className="text-white/90 text-sm leading-relaxed max-w-2xl text-shadow-strong">{item.desc}</p>
              </div>
              <MagneticButton variant="secondary" className="parallax-element" data-depth="0.08">
                Details
              </MagneticButton>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Section 5: Contact (Footer) */}
      <section id="contact" className="h-screen flex flex-col items-center justify-center px-8 relative z-40">
        <TiltCard className="p-20 text-center max-w-5xl w-full pointer-events-auto">
          <h2 className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-12 text-white parallax-element text-shadow-strong" data-depth="0.05">
            <RevealText>READY FOR</RevealText>
            <br />
            <RevealText>LIFTOFF?</RevealText>
          </h2>
          <div className="flex flex-wrap justify-center gap-10 text-[10px] text-white uppercase tracking-[0.3em] mb-16 parallax-element font-bold text-shadow-strong" data-depth="0.03">
            <a href="#" className="hover:text-[#00ff88] transition-colors">Missions</a>
            <a href="#" className="hover:text-[#00ff88] transition-colors">Technology</a>
            <a href="#" className="hover:text-[#00ff88] transition-colors">Research</a>
            <a href="#" className="hover:text-[#00ff88] transition-colors">Contact</a>
          </div>
          <div className="flex justify-center gap-6 parallax-element" data-depth="0.08">
            <MagneticButton variant="primary">Get Started</MagneticButton>
            <MagneticButton variant="secondary">Documentation</MagneticButton>
          </div>
        </TiltCard>
        <p className="mt-20 text-[10px] text-white uppercase tracking-[0.5em] pointer-events-auto font-bold text-shadow-strong">
          © 2026 Lunar Obsidian. All systems nominal.
        </p>
      </section>
    </div>
  );
}
