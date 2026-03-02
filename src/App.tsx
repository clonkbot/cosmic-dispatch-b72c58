import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SpaceClock from './components/SpaceClock'
import NewsPanel from './components/NewsPanel'
import MemeGenerator from './components/MemeGenerator'
import Scanlines from './components/Scanlines'

type Tab = 'news' | 'meme'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('news')
  const [newsIndex, setNewsIndex] = useState(0)
  const [transmissionAlert, setTransmissionAlert] = useState(false)

  const triggerNewTransmission = useCallback(() => {
    setTransmissionAlert(true)
    setNewsIndex(prev => (prev + 1) % 12)
    setTimeout(() => setTransmissionAlert(false), 3000)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#39ff14] font-mono relative overflow-hidden flex flex-col">
      <Scanlines />

      {/* Starfield background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(#39ff14 1px, transparent 1px),
            linear-gradient(90deg, #39ff14 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Transmission Alert Overlay */}
      <AnimatePresence>
        {transmissionAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 pointer-events-none"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [1, 0.8, 1],
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-center"
            >
              <div className="text-[#ffaa00] text-xl md:text-3xl font-orbitron tracking-widest mb-4">
                TRANSMISSION INCOMING
              </div>
              <div className="text-[#39ff14] text-4xl md:text-6xl font-orbitron animate-pulse">
                ///DECODING///
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="relative z-10 border-b border-[#39ff14]/30 bg-[#0a0a0f]/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="text-2xl md:text-4xl"
              >
                <span role="img" aria-label="ufo">&#128760;</span>
              </motion.div>
              <div>
                <h1 className="font-orbitron text-lg md:text-2xl tracking-wider text-[#ffaa00]">
                  COSMIC DISPATCH
                </h1>
                <p className="text-[10px] md:text-xs text-[#39ff14]/60 font-vt323 tracking-widest">
                  EXTRATERRESTRIAL MONITORING STATION
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs font-vt323">
              <span className="w-2 h-2 bg-[#39ff14] rounded-full animate-pulse" />
              <span>SIGNAL: ACTIVE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 max-w-7xl mx-auto w-full px-4 py-4 md:py-8 flex flex-col">
        {/* Clock Section */}
        <SpaceClock onTransmission={triggerNewTransmission} />

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 my-4 md:my-6">
          {(['news', 'meme'] as Tab[]).map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab)}
              className={`
                px-4 md:px-8 py-2 md:py-3 font-orbitron text-xs md:text-sm tracking-wider
                border-2 transition-all duration-300 min-w-[120px] md:min-w-[160px]
                ${activeTab === tab
                  ? 'bg-[#39ff14] text-[#0a0a0f] border-[#39ff14] shadow-[0_0_20px_#39ff14]'
                  : 'bg-transparent text-[#39ff14] border-[#39ff14]/50 hover:border-[#39ff14]'
                }
              `}
            >
              {tab === 'news' ? 'SPACE NEWS' : 'MEME LAB'}
            </motion.button>
          ))}
        </div>

        {/* Content Panels */}
        <div className="flex-1 min-h-0">
          <AnimatePresence mode="wait">
            {activeTab === 'news' ? (
              <motion.div
                key="news"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <NewsPanel currentIndex={newsIndex} />
              </motion.div>
            ) : (
              <motion.div
                key="meme"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <MemeGenerator />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#39ff14]/20 bg-[#0a0a0f]/90 backdrop-blur-sm py-3 md:py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] md:text-xs font-vt323 text-[#39ff14]/40 tracking-wide">
            Requested by @web-user · Built by @clonkbot
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
