import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PageLoader = React.memo(function PageLoader({ text = "" }) {
  // SVG Path for the GlitchCloud "G" Logo
  // Recreating the stylized G from the reference image
  const logoPath = "M 40,80 A 40,40 0 1,1 80,40 L 80,25 L 100,25 L 100,60 L 80,60 L 80,45 A 25,25 0 1,0 40,65 L 40,45 L 60,45 L 60,55 L 40,55 Z";

  // Simplified high-fidelity paths based on the reference image
  const mainPath = "M 70 20 C 35 20 20 45 20 70 C 20 95 45 120 70 120 C 95 120 120 95 120 70 L 120 50 M 120 70 L 80 70";

  // Let's use a more accurate recreation of the logo
  const gPath = "M 96.5,41.5 L 96.5,101.5 L 36.5,101.5 C 16.5,101.5 0.5,85.5 0.5,65.5 C 0.5,45.5 16.5,29.5 36.5,29.5 L 56.5,29.5 L 71.5,44.5 L 41.5,44.5 C 31.5,44.5 24.5,51.5 24.5,61.5 C 24.5,71.5 31.5,78.5 41.5,78.5 L 73.5,78.5 L 73.5,57.5 L 51.5,57.5 L 51.5,42.5 L 88.5,42.5 L 116.5,70.5 L 96.5,70.5 Z";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#030305] overflow-hidden font-urbanist"
    >
      <div className="relative">
        {/* Glow Pulse Background */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-primary rounded-full blur-[80px]"
          style={{ width: '120px', height: '120px', left: '50%', top: '50%', marginLeft: '-60px', marginTop: '-60px' }}
        />

        {/* Logo SVG */}
        <motion.div
          animate={{
            x: [0, -1, 1, -1, 0],
            y: [0, 1, -1, 1, 0],
            filter: [
              "none",
              "drop-shadow(-2px 0 #ff00ff) drop-shadow(2px 0 #00ffff)",
              "none",
              "drop-shadow(1px 0 #ff00ff) drop-shadow(-1px 0 #00ffff)",
              "none"
            ]
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "linear"
          }}
          className="relative z-10"
        >
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            {/* The "G" Body */}
            <motion.path
              d="M 80 30 A 35 35 0 1 0 80 70 L 80 50 L 50 50"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            {/* The Arrow Head */}
            <motion.path
              d="M 70 20 L 90 20 L 90 40"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      </div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: [0.4, 1, 0.4],
          y: 0
        }}
        transition={{
          opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 0.5 }
        }}
        className="mt-8 text-white/60 text-sm font-medium tracking-widest uppercase"
      >
        {text}
      </motion.div>

      {/* Subtle Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20" />
    </motion.div>
  );
});
