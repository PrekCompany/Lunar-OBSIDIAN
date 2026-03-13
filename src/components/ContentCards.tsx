import { motion } from 'framer-motion';
import { Globe, Orbit, Wind } from 'lucide-react';

const cards = [
  { title: 'The Inner Planets', desc: 'Rocky worlds forged in the heat of the young sun.', icon: Globe },
  { title: 'Gas Giants', desc: 'Massive spheres of hydrogen and helium.', icon: Orbit },
  { title: 'Ice Giants', desc: 'Uranus and Neptune, cold and distant.', icon: Wind }
];

export function ContentCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl pointer-events-auto">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={i}
            whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
            className="relative overflow-hidden p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] hover:animate-shine" />
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10">
              <Icon className="w-5 h-5 text-white/90" />
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight text-white">{card.title}</h3>
            <p className="text-white/80 leading-relaxed text-sm">{card.desc}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
