"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SubProject {
  title: string;
  description: string;
  highlights: string[];
  techStack: string[];
}

interface Project {
  id: string;
  tag: string;
  tagColor: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  techStack: string[];
  subProjects?: SubProject[];
}

const projects: Project[] = [
  {
    id: "iisc",
    tag: "EXPERIENCE",
    tagColor: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    title: "IISc — Mechatronics Engineer Intern",
    subtitle: "Indian Institute of Science, Bangalore",
    description:
      "Completed two major engineering projects during my internship at IISc — spanning smart agriculture IoT systems and microgravity simulation research hardware.",
    highlights: [
      "Worked on research-grade mechatronics systems across IoT and motion control domains",
      "Collaborated with cross-disciplinary teams in a world-class research environment",
    ],
    techStack: ["Arduino Uno R4", "Teensy 4.1", "ESP32", "C/C++", "Mongo DB", "MPU6050"],
    subProjects: [
      {
        title: "LYCI Meter — Smart Agriculture IoT System",
        description:
          "A Smart Agriculture IoT system designed to monitor and analyze agricultural parameters in real-time, enabling data-driven farming decisions.",
        highlights: [
          "Designed and deployed IoT sensor networks using Arduino Uno R4",
          "Implemented RS-485 communication protocol for long-distance data transmission",
          "Integrated strain gauge sensors for precise measurement of physical parameters",
          "Built real-time data acquisition and monitoring dashboards",
        ],
        techStack: ["Arduino Uno R4", "RS-485", "Strain Gauge", "IoT Sensors", "Data Acquisition"],
      },
      {
        title: "Random Positioning Machine (RPM) — Microgravity Simulator",
        description:
          "Engineered a mechatronics system designed to simulate a microgravity environment for biological and physical research. The machine utilizes advanced, randomized trajectory control to generate smooth, continuous 3D tumbling, effectively mimicking weightlessness for scientific observation.",
        highlights: [
          "Dynamic Motion Control: Programmed and fine-tuned motor speeds, microstepping configurations, and random timer intervals.",
          "Hardware Architecture: Designed and wired a precise hardware circuit for seamless communication between MCUs, drivers, and sensors.",
          "Real-Time Orientation Tracking: Integrated spatial tracking systems to constantly monitor and adjust parameters on the fly.",
        ],
        techStack: ["Teensy 4.1", "ESP32", "Stepper Motors", "TB6612", "MG995 Servos", "MPU6050", "C/C++"],
      },
    ],
  },
  {
    id: "drover",
    tag: "FLAGSHIP PROJECT",
    tagColor: "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10",
    title: "DRO-VER",
    subtitle: "Disaster Assistance Drone CUM Rover",
    description:
      "An autonomous hybrid vehicle designed for disaster relief operations. DRO-VER transitions between aerial drone and ground rover modes to navigate through landslide debris and locate trapped survivors.",
    highlights: [
      "Hybrid drone-rover architecture for multi-terrain navigation",
      "Survivor detection system for landslide disaster response",
      "Autonomous path planning through debris fields",
      "Real-time telemetry and remote operation capabilities",
    ],
    techStack: ["Embedded Systems", "Computer Vision", "Autonomous Navigation", "Telemetry"],
  },
  {
    id: "advaya",
    tag: "HACKATHON",
    tagColor: "text-violet-400 border-violet-400/30 bg-violet-400/10",
    title: "ADVAYA-2025 National Hackathon",
    subtitle: "Hospital Resource Management System",
    description:
      "Built during the ADVAYA-2025 National Hackathon — a comprehensive Hospital Resource Management System designed to optimize the allocation and tracking of critical medical resources across hospital networks.",
    highlights: [
      "Real-time resource tracking and allocation engine",
      "Dashboard for hospital administrators to manage supplies",
      "Predictive analytics for resource demand forecasting",
      "Multi-hospital network integration",
    ],
    techStack: ["Full-Stack", "Database Management", "Analytics", "Dashboard UI"],
  },
];

export default function Blueprints() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [expandedSubIdx, setExpandedSubIdx] = useState<number | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
    setExpandedSubIdx(null);
  };

  const toggleSubProject = (idx: number) => {
    setExpandedSubIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="blueprints" className="relative px-6 py-20 max-w-6xl mx-auto">
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
            Archive::Projects
          </span>
        </div>
        <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-3">
          Project <span className="neon-text">Experience</span>
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Expand each schematic file to explore the details of key projects and
          experience.
        </p>
      </motion.div>

      {/* Project Cards */}
      <div className="space-y-5">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: idx * 0.12, duration: 0.5 }}
            className="animate-float"
            style={{ animationDelay: `${idx * 1.2}s` }}
          >
            <div className="glass-panel overflow-hidden">
              {/* Collapsed Header */}
              <button
                onClick={() => toggleExpand(project.id)}
                className="w-full flex items-center justify-between p-6 text-left
                           hover:bg-neon-cyan/5 transition-colors duration-300"
                aria-expanded={expandedId === project.id}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg border border-neon-cyan/20 bg-neon-cyan/5">
                    <svg
                      className="w-5 h-5 text-neon-cyan"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className={`text-[10px] font-orbitron tracking-widest uppercase px-2 py-0.5 rounded-full border ${project.tagColor}`}
                      >
                        {project.tag}
                      </span>
                      {project.subProjects && (
                        <span className="text-[10px] font-orbitron tracking-widest uppercase px-2 py-0.5 rounded-full border text-gray-500 border-gray-600/30 bg-gray-600/10">
                          {project.subProjects.length} Projects
                        </span>
                      )}
                    </div>
                    <h3 className="font-orbitron text-sm md:text-base text-white">
                      {project.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                <motion.div
                  animate={{ rotate: expandedId === project.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-neon-cyan/50"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedId === project.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-neon-cyan/10">
                      {/* Description */}
                      <p className="text-gray-400 text-sm leading-relaxed mb-5">
                        {project.description}
                      </p>

                      {/* Sub-Projects (e.g. IISc nested projects) */}
                      {project.subProjects ? (
                        <div className="space-y-3 mb-5">
                          <h4 className="font-orbitron text-xs text-neon-cyan/70 tracking-wider uppercase mb-3">
                            Projects
                          </h4>
                          {project.subProjects.map((sub, si) => (
                            <div
                              key={si}
                              className="rounded-lg border border-neon-cyan/10 bg-neon-cyan/5 overflow-hidden"
                            >
                              <button
                                onClick={() => toggleSubProject(si)}
                                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-neon-cyan/5 transition-colors duration-200"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-neon-cyan/40 text-xs">▹</span>
                                  <span className="font-orbitron text-xs text-white tracking-wide">
                                    {sub.title}
                                  </span>
                                </div>
                                <motion.div
                                  animate={{ rotate: expandedSubIdx === si ? 180 : 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="text-neon-cyan/30"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </motion.div>
                              </button>

                              <AnimatePresence>
                                {expandedSubIdx === si && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                  >
                                    <div className="px-4 pb-4 pt-1 border-t border-neon-cyan/10">
                                      <p className="text-gray-400 text-xs leading-relaxed mb-3">
                                        {sub.description}
                                      </p>
                                      <ul className="space-y-1.5 mb-3">
                                        {sub.highlights.map((h, hi) => (
                                          <li key={hi} className="flex items-start gap-2 text-xs text-gray-300">
                                            <span className="text-neon-cyan mt-0.5 text-[10px]">▹</span>
                                            {h}
                                          </li>
                                        ))}
                                      </ul>
                                      <div className="flex flex-wrap gap-1.5">
                                        {sub.techStack.map((tech) => (
                                          <span
                                            key={tech}
                                            className="px-2 py-0.5 text-[10px] rounded border border-neon-cyan/15 bg-neon-cyan/5 text-gray-400"
                                          >
                                            {tech}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          {/* Highlights */}
                          <div className="mb-5">
                            <h4 className="font-orbitron text-xs text-neon-cyan/70 tracking-wider uppercase mb-3">
                              Key Highlights
                            </h4>
                            <ul className="space-y-2">
                              {project.highlights.map((h, hi) => (
                                <li
                                  key={hi}
                                  className="flex items-start gap-2 text-sm text-gray-300"
                                >
                                  <span className="text-neon-cyan mt-1 text-xs">▹</span>
                                  {h}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Tech Stack */}
                          <div>
                            <h4 className="font-orbitron text-xs text-neon-cyan/70 tracking-wider uppercase mb-3">
                              Tech Stack
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {project.techStack.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2.5 py-1 text-[11px] rounded-md border border-neon-cyan/15 bg-neon-cyan/5 text-gray-400"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
