"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const DroneModel = dynamic(() => import("./DroneModel"), { ssr: false });

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 py-20"
    >
      {/* Radial glow behind hero */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[700px] h-[700px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(0,243,255,0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left — Text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* System tag */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/5"
          >
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-neon-cyan text-xs font-orbitron tracking-[0.2em] uppercase">
              System Initialized
            </span>
          </motion.div>

          <h1 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            <span className="text-white">Suprith M</span>
            <br />
            <span className="neon-text text-3xl md:text-4xl lg:text-5xl">
              Mechatronics Engineer
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-gray-400 text-lg md:text-xl max-w-md leading-relaxed mb-8"
          >
            Bridging{" "}
            <span className="text-neon-cyan font-medium">Hardware</span>,{" "}
            <span className="text-neon-cyan font-medium">IoT</span>, and{" "}
            <span className="text-neon-cyan font-medium">Automation</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#blueprints"
              className="px-6 py-3 rounded-lg font-orbitron text-sm tracking-wider uppercase
                         bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan
                         hover:bg-neon-cyan/20 hover:border-neon-cyan/70 hover:shadow-neon
                         transition-all duration-300"
            >
              View Projects
            </a>
            <a
              href="#comms"
              className="px-6 py-3 rounded-lg font-orbitron text-sm tracking-wider uppercase
                         border border-white/20 text-gray-300
                         hover:border-neon-cyan/40 hover:text-neon-cyan hover:shadow-neon
                         transition-all duration-300"
            >
              Open Communication
            </a>
          </motion.div>
        </motion.div>

        {/* Right — 3D Drone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          <div className="w-full h-[400px] md:h-[500px] lg:h-[550px]">
            <DroneModel />
          </div>

          {/* Decorative ring */}
          <div
            className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-neon-cyan/10 animate-spin pointer-events-none"
            style={{ animationDuration: "30s" }}
          />
        </motion.div>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-neon-cyan/50 text-xs font-orbitron tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full border border-neon-cyan/30 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 rounded-full bg-neon-cyan/60"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
