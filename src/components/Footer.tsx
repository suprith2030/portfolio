"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiExternalLink } from "react-icons/fi";

const socials = [
  {
    label: "GitHub",
    icon: FiGithub,
    href: "https://github.com/suprith0007",
  },
  {
    label: "LinkedIn",
    icon: FiLinkedin,
    href: "https://linkedin.com/in/suprith-m-0b8871311",
  },
];

export default function Footer() {
  return (
    <footer id="comms" className="relative px-6 py-20 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        {/* Tag */}
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5">
          <span className="text-neon-cyan text-[10px] font-orbitron tracking-[0.25em] uppercase">
            Channel::Open
          </span>
        </div>

        <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-3">
          Comms <span className="neon-text">Link</span>
        </h2>
        <p className="text-gray-500 max-w-md mx-auto mb-10">
          Ready to collaborate? Open a communication channel below.
        </p>
      </motion.div>

      {/* Contact Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="glass-panel p-8 animate-float max-w-lg mx-auto"
      >
        {/* Email */}
        <a
          href="mailto:suprith2030@gmail.com"
          className="group flex items-center gap-4 mb-8 p-4 rounded-lg border border-neon-cyan/10 bg-neon-cyan/5
                     hover:border-neon-cyan/40 hover:bg-neon-cyan/10 transition-all duration-300"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-lg border border-neon-cyan/20 bg-neon-cyan/5 group-hover:shadow-neon transition-shadow">
            <FiMail className="text-neon-cyan" size={18} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-orbitron text-neon-cyan/50 tracking-widest uppercase mb-0.5">
              Email
            </p>
            <p className="text-sm text-gray-300 group-hover:text-neon-cyan transition-colors">
              suprith2030@gmail.com
            </p>
          </div>
          <FiExternalLink className="text-neon-cyan/30 group-hover:text-neon-cyan/70 transition-colors" size={14} />
        </a>

        {/* Socials */}
        <div className="flex items-center justify-center gap-4">
          {socials.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 px-5 py-3 rounded-lg
                         border border-neon-cyan/15 bg-neon-cyan/5
                         hover:border-neon-cyan/50 hover:bg-neon-cyan/10 hover:shadow-neon
                         transition-all duration-300"
            >
              <social.icon
                className="text-neon-cyan/60 group-hover:text-neon-cyan transition-colors"
                size={18}
              />
              <span className="text-xs font-orbitron text-gray-400 group-hover:text-neon-cyan/80 tracking-wider uppercase transition-colors">
                {social.label}
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Bottom credits */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-16 text-center"
      >
        <div className="inline-flex items-center gap-2 text-gray-600 text-xs font-orbitron tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan/40 animate-pulse" />
          <span>SYSTEM ACTIVE — © 2025 Suprith M</span>
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan/40 animate-pulse" />
        </div>
      </motion.div>
    </footer>
  );
}
