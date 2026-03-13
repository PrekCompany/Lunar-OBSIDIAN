import { motion, Variants } from 'framer-motion';

export function Hero() {
  const title = "Lunar Obsidian";
  const letters = title.split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.04 },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="h-screen w-full flex flex-col items-center justify-center relative">
      <motion.div
        style={{ overflow: "hidden", display: "flex" }}
        variants={container}
        initial="hidden"
        animate="visible"
        className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 text-white"
      >
        {letters.map((letter, index) => (
          <motion.span variants={child} key={index}>
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-lg md:text-xl font-light tracking-widest text-white/80 uppercase mb-10"
      >
        The Next Frontier of Digital Experience
      </motion.p>
      <div className="flex gap-6 justify-center pointer-events-auto">
        <button className="relative px-8 py-4 rounded-full group overflow-hidden border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300">
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-beam" />
          <span className="relative z-10 uppercase tracking-widest text-sm font-medium text-white">Explore Missions</span>
        </button>
        <button className="relative px-8 py-4 rounded-full group overflow-hidden border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300">
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-beam" />
          <span className="relative z-10 uppercase tracking-widest text-sm font-medium text-white">View Data</span>
        </button>
      </div>
    </section>
  );
}
