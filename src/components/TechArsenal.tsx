"use client";

import { motion } from "framer-motion";

interface Skill {
  name: string;
  icon: string;
}

interface SkillCategory {
  title: string;
  tag: string;
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    title: "Hardware & Design",
    tag: "HW",
    skills: [
      { name: "CAD/CAM(Fusion 360)", icon: "" },
      { name: "PCB Design(KiCad,Altium)", icon: "" },
      { name: "3D Printing", icon: "" },
    ],
  },
  {
    title: "Programming & Web Design",
    tag: "PRG",
    skills: [
      { name: "Python", icon: "" },
      { name: "C/C++", icon: "" },
      { name: "HTML/CSS/JavaScript", icon: "" },
      { name: "PLC Programing", icon: "" },
      { name: "HDL(VHDL/Verilog)", icon: "" },
     
    ],
  },
  {
    title: "Systems",
    tag: "SYS",
    skills: [
      { name: "NI LabVIEW", icon: "" },
      { name: "ABB RobotStudio", icon: "" },
      { name: "ANSYS", icon: "" },

    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const nodeVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

export default function TechArsenal() {
  return (
    <section id="arsenal" className="relative px-6 py-20 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5">
          <span className="text-neon-cyan text-[10px] font-orbitron tracking-[0.25em] uppercase">
            Module::Skills
          </span>
        </div>
        <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-3">
          Technical <span className="neon-text">Skills</span>
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          
        </p>
      </motion.div>

      {/* Category Groups */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category, catIdx) => (
          <motion.div
            key={category.tag}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: catIdx * 0.15, duration: 0.6 }}
            className="glass-panel p-6 animate-float"
            style={{ animationDelay: `${catIdx * 0.8}s` }}
          >
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-8 flex items-center justify-center rounded-md bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-orbitron text-xs font-bold">
                {category.tag}
              </span>
              <h3 className="font-orbitron text-sm text-white tracking-wider uppercase">
                {category.title}
              </h3>
            </div>

            {/* Skill Nodes */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {category.skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={nodeVariants}
                  whileHover={{
                    scale: 1.08,
                    boxShadow:
                      "0 0 20px rgba(0,243,255,0.4), 0 0 40px rgba(0,243,255,0.15)",
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg
                             border border-neon-cyan/15 bg-neon-cyan/5
                             hover:border-neon-cyan/50 hover:bg-neon-cyan/10
                             transition-colors duration-300 cursor-default"
                >
                  <span className="text-sm">{skill.icon}</span>
                  <span className="text-xs text-gray-300 font-medium">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
