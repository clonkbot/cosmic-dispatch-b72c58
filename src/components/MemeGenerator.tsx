import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type AlienEmoji = '👽' | '🛸' | '👾' | '🌌' | '🪐' | '☄️' | '🚀' | '🌙'
type MemeSticker = {
  id: number
  emoji: AlienEmoji
  x: number
  y: number
  scale: number
  rotation: number
}

const alienEmojis: AlienEmoji[] = ['👽', '🛸', '👾', '🌌', '🪐', '☄️', '🚀', '🌙']

const memeTemplates = [
  { id: 1, caption: 'THEY FOUND US', gradient: 'from-purple-900 via-black to-green-900' },
  { id: 2, caption: 'TAKE ME TO YOUR LEADER', gradient: 'from-blue-900 via-black to-purple-900' },
  { id: 3, caption: 'AREA 51 REAL FOOTAGE', gradient: 'from-green-900 via-black to-blue-900' },
  { id: 4, caption: 'ME AFTER SEEING A UFO', gradient: 'from-pink-900 via-black to-cyan-900' },
  { id: 5, caption: 'ALIENS BE LIKE...', gradient: 'from-orange-900 via-black to-purple-900' },
  { id: 6, caption: 'SPACE FORCE CLASSIFIED', gradient: 'from-red-900 via-black to-blue-900' },
]

const bottomCaptions = [
  'BRUH MOMENT IN SPACE',
  'WHEN THE SIGNAL HITS',
  'COSMIC VIBES ONLY',
  'INTERGALACTIC DRIP',
  'EXTRATERRESTRIAL GOALS',
  'BEAMING UP RN',
]

export default function MemeGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState(memeTemplates[0])
  const [topText, setTopText] = useState('')
  const [bottomText, setBottomText] = useState('')
  const [stickers, setStickers] = useState<MemeSticker[]>([])
  const [selectedEmoji, setSelectedEmoji] = useState<AlienEmoji>('👽')
  const canvasRef = useRef<HTMLDivElement>(null)
  const [nextId, setNextId] = useState(1)

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    const newSticker: MemeSticker = {
      id: nextId,
      emoji: selectedEmoji,
      x,
      y,
      scale: 1 + Math.random() * 0.5,
      rotation: Math.random() * 40 - 20,
    }

    setStickers(prev => [...prev, newSticker])
    setNextId(prev => prev + 1)
  }

  const removeSticker = (id: number) => {
    setStickers(prev => prev.filter(s => s.id !== id))
  }

  const randomizeCaption = () => {
    setTopText(memeTemplates[Math.floor(Math.random() * memeTemplates.length)].caption)
    setBottomText(bottomCaptions[Math.floor(Math.random() * bottomCaptions.length)])
  }

  const clearAll = () => {
    setStickers([])
    setTopText('')
    setBottomText('')
  }

  return (
    <div className="h-full">
      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
        <span className="text-xl md:text-2xl">👽</span>
        <h2 className="font-orbitron text-sm md:text-lg text-[#9d4edd] tracking-wider">
          ALIEN MEME LAB
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[#9d4edd]/50 to-transparent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Canvas */}
        <div className="order-1">
          <div
            ref={canvasRef}
            onClick={handleCanvasClick}
            className={`
              relative aspect-square max-w-full md:max-w-md mx-auto
              bg-gradient-to-br ${selectedTemplate.gradient}
              rounded-lg border-2 border-[#9d4edd]/50 overflow-hidden cursor-crosshair
              shadow-[0_0_30px_rgba(157,78,221,0.3)]
            `}
          >
            {/* Scanlines on canvas */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
              }}
            />

            {/* Top Text */}
            {topText && (
              <div className="absolute top-2 md:top-4 left-0 right-0 text-center px-2">
                <span
                  className="font-orbitron text-lg md:text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  style={{ textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000' }}
                >
                  {topText}
                </span>
              </div>
            )}

            {/* Stickers */}
            <AnimatePresence>
              {stickers.map(sticker => (
                <motion.div
                  key={sticker.id}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: sticker.scale, rotate: sticker.rotation }}
                  exit={{ scale: 0, rotate: 180 }}
                  className="absolute cursor-pointer select-none"
                  style={{
                    left: `${sticker.x}%`,
                    top: `${sticker.y}%`,
                    transform: `translate(-50%, -50%) scale(${sticker.scale}) rotate(${sticker.rotation}deg)`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    removeSticker(sticker.id)
                  }}
                  whileHover={{ scale: sticker.scale * 1.2 }}
                >
                  <span className="text-3xl md:text-5xl drop-shadow-lg">{sticker.emoji}</span>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Bottom Text */}
            {bottomText && (
              <div className="absolute bottom-2 md:bottom-4 left-0 right-0 text-center px-2">
                <span
                  className="font-orbitron text-lg md:text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  style={{ textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000' }}
                >
                  {bottomText}
                </span>
              </div>
            )}

            {/* Click hint */}
            {stickers.length === 0 && !topText && !bottomText && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-vt323 text-sm md:text-base text-white/50">
                  TAP TO ADD STICKERS
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-3 md:space-y-4 order-2">
          {/* Emoji Selector */}
          <div className="bg-[#0a0a0f]/80 border border-[#9d4edd]/30 rounded-lg p-3 md:p-4">
            <label className="block font-vt323 text-xs md:text-sm text-[#9d4edd] mb-2">
              SELECT STICKER
            </label>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {alienEmojis.map(emoji => (
                <motion.button
                  key={emoji}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`
                    w-10 h-10 md:w-12 md:h-12 text-xl md:text-2xl rounded-lg border-2 transition-all
                    ${selectedEmoji === emoji
                      ? 'border-[#9d4edd] bg-[#9d4edd]/20 shadow-[0_0_10px_#9d4edd]'
                      : 'border-[#39ff14]/30 hover:border-[#39ff14]/60'
                    }
                  `}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Template Selector */}
          <div className="bg-[#0a0a0f]/80 border border-[#9d4edd]/30 rounded-lg p-3 md:p-4">
            <label className="block font-vt323 text-xs md:text-sm text-[#9d4edd] mb-2">
              BACKGROUND THEME
            </label>
            <div className="grid grid-cols-3 gap-1 md:gap-2">
              {memeTemplates.map(template => (
                <motion.button
                  key={template.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTemplate(template)}
                  className={`
                    h-8 md:h-10 rounded border-2 bg-gradient-to-br ${template.gradient}
                    ${selectedTemplate.id === template.id
                      ? 'border-[#39ff14] shadow-[0_0_10px_#39ff14]'
                      : 'border-transparent hover:border-[#39ff14]/50'
                    }
                  `}
                />
              ))}
            </div>
          </div>

          {/* Text Inputs */}
          <div className="bg-[#0a0a0f]/80 border border-[#9d4edd]/30 rounded-lg p-3 md:p-4 space-y-3">
            <div>
              <label className="block font-vt323 text-xs md:text-sm text-[#9d4edd] mb-1">
                TOP TEXT
              </label>
              <input
                type="text"
                value={topText}
                onChange={e => setTopText(e.target.value.toUpperCase())}
                placeholder="ENTER TOP TEXT..."
                className="w-full bg-[#0a0a0f] border border-[#39ff14]/50 rounded px-3 py-2 font-orbitron text-xs md:text-sm text-[#39ff14] placeholder-[#39ff14]/30 focus:outline-none focus:border-[#39ff14] focus:shadow-[0_0_10px_#39ff14]"
              />
            </div>
            <div>
              <label className="block font-vt323 text-xs md:text-sm text-[#9d4edd] mb-1">
                BOTTOM TEXT
              </label>
              <input
                type="text"
                value={bottomText}
                onChange={e => setBottomText(e.target.value.toUpperCase())}
                placeholder="ENTER BOTTOM TEXT..."
                className="w-full bg-[#0a0a0f] border border-[#39ff14]/50 rounded px-3 py-2 font-orbitron text-xs md:text-sm text-[#39ff14] placeholder-[#39ff14]/30 focus:outline-none focus:border-[#39ff14] focus:shadow-[0_0_10px_#39ff14]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 md:gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={randomizeCaption}
              className="flex-1 py-2 md:py-3 font-orbitron text-xs md:text-sm bg-[#9d4edd]/20 border border-[#9d4edd] text-[#9d4edd] rounded-lg hover:bg-[#9d4edd]/30 transition-colors"
            >
              RANDOMIZE
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={clearAll}
              className="flex-1 py-2 md:py-3 font-orbitron text-xs md:text-sm bg-[#ff3366]/20 border border-[#ff3366] text-[#ff3366] rounded-lg hover:bg-[#ff3366]/30 transition-colors"
            >
              CLEAR ALL
            </motion.button>
          </div>

          {/* Instructions */}
          <div className="font-vt323 text-[10px] md:text-xs text-[#39ff14]/50 space-y-1">
            <p>• TAP CANVAS TO PLACE SELECTED STICKER</p>
            <p>• TAP STICKER AGAIN TO REMOVE IT</p>
            <p>• MEME WILL BE CLASSIFIED AS TOP SECRET</p>
          </div>
        </div>
      </div>
    </div>
  )
}
