import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface SpaceClockProps {
  onTransmission: () => void
}

const CYCLE_DURATION = 24 * 60 // 24 minutes in seconds

export default function SpaceClock({ onTransmission }: SpaceClockProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [countdown, setCountdown] = useState(CYCLE_DURATION)
  const lastTransmissionRef = useRef<number>(Date.now())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          onTransmission()
          lastTransmissionRef.current = Date.now()
          return CYCLE_DURATION
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(countdownTimer)
  }, [onTransmission])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((CYCLE_DURATION - countdown) / CYCLE_DURATION) * 100

  return (
    <div className="relative">
      {/* Main Clock Display */}
      <div className="text-center mb-4 md:mb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative inline-block"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 blur-xl bg-[#39ff14]/20 rounded-full" />

          <div className="relative bg-[#0a0a0f] border-2 border-[#39ff14]/50 rounded-lg px-4 md:px-8 py-3 md:py-4 shadow-[0_0_30px_rgba(57,255,20,0.3)]">
            <div className="text-[10px] md:text-xs text-[#ffaa00] font-vt323 tracking-widest mb-1 md:mb-2">
              EARTH TIME
            </div>
            <div className="font-orbitron text-3xl md:text-6xl tracking-wider text-[#39ff14] tabular-nums">
              {formatTime(currentTime)}
            </div>
            <div className="text-[10px] md:text-xs text-[#39ff14]/60 font-vt323 mt-1 md:mt-2">
              {currentTime.toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }).toUpperCase()}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Countdown to Next Transmission */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-md mx-auto"
      >
        <div className="bg-[#0a0a0f]/80 border border-[#9d4edd]/50 rounded-lg p-3 md:p-4">
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <span className="text-[10px] md:text-xs font-vt323 text-[#9d4edd] tracking-widest">
              NEXT TRANSMISSION IN
            </span>
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="flex items-center gap-1 md:gap-2"
            >
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#9d4edd] rounded-full" />
              <span className="text-[8px] md:text-[10px] font-vt323 text-[#9d4edd]">SCANNING</span>
            </motion.div>
          </div>

          <div className="text-center mb-2 md:mb-3">
            <span className="font-orbitron text-2xl md:text-4xl text-[#00d4ff] tabular-nums">
              {formatCountdown(countdown)}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 md:h-3 bg-[#1a1a2f] rounded-full overflow-hidden border border-[#9d4edd]/30">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#9d4edd] to-[#00d4ff]"
              style={{ width: `${progress}%` }}
              animate={{
                boxShadow: [
                  '0 0 10px #9d4edd',
                  '0 0 20px #9d4edd',
                  '0 0 10px #9d4edd',
                ],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            {/* Scan line effect */}
            <motion.div
              className="absolute inset-y-0 w-4 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['0%', '2400%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <div className="flex justify-between mt-2 text-[8px] md:text-[10px] font-vt323 text-[#39ff14]/50">
            <span>00:00</span>
            <span>24:00</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
