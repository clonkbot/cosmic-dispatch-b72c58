import { motion } from 'framer-motion'

export default function Scanlines() {
  return (
    <>
      {/* Static scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-40 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.5) 2px, rgba(0, 0, 0, 0.5) 4px)',
        }}
      />

      {/* Moving scan line */}
      <motion.div
        className="fixed left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#39ff14]/20 to-transparent pointer-events-none z-40"
        animate={{
          top: ['0%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* CRT vignette effect */}
      <div
        className="fixed inset-0 pointer-events-none z-30"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Subtle flicker */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-40 bg-[#39ff14]/[0.01]"
        animate={{
          opacity: [0, 0.02, 0, 0.01, 0],
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          repeatDelay: Math.random() * 5 + 3,
        }}
      />
    </>
  )
}
