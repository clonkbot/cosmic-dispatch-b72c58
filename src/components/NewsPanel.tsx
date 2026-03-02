import { motion } from 'framer-motion'

interface NewsPanelProps {
  currentIndex: number
}

const spaceNews = [
  {
    id: 1,
    title: 'MYSTERIOUS SIGNAL DETECTED FROM PROXIMA CENTAURI',
    summary: 'Astronomers have detected a narrow-band radio signal from the direction of our nearest stellar neighbor. The signal, designated BLC1, has characteristics unlike any known natural phenomena.',
    source: 'DEEP SPACE NETWORK',
    timestamp: '2 CYCLES AGO',
    priority: 'HIGH',
  },
  {
    id: 2,
    title: 'JAMES WEBB CAPTURES ORGANIC MOLECULES ON EXOPLANET',
    summary: 'The JWST has detected complex carbon-based molecules in the atmosphere of K2-18b, a potentially habitable exoplanet 120 light-years away. Scientists are analyzing data for signs of biological origin.',
    source: 'NASA HQ',
    timestamp: '5 CYCLES AGO',
    priority: 'CRITICAL',
  },
  {
    id: 3,
    title: 'UNEXPLAINED OBJECT CHANGES TRAJECTORY NEAR JUPITER',
    summary: 'An unidentified object tracked by ESA telescopes has exhibited non-ballistic motion while passing through the Jovian system. Preliminary analysis rules out gravitational influence from known bodies.',
    source: 'ESA OBSERVATORY',
    timestamp: '8 CYCLES AGO',
    priority: 'MEDIUM',
  },
  {
    id: 4,
    title: 'ANCIENT MICROBIAL FOSSILS CONFIRMED IN MARS METEORITE',
    summary: 'New electron microscope analysis of ALH84001 reveals structures consistent with biogenic magnetite chains. Multiple independent labs have verified the findings.',
    source: 'LUNAR & PLANETARY INST',
    timestamp: '12 CYCLES AGO',
    priority: 'HIGH',
  },
  {
    id: 5,
    title: 'RADIO BURST SEQUENCE SHOWS MATHEMATICAL PATTERNS',
    summary: 'Fast radio bursts from FRB 20180916B display timing intervals corresponding to prime number sequences. SETI researchers are investigating possible artificial origin.',
    source: 'SETI INSTITUTE',
    timestamp: '15 CYCLES AGO',
    priority: 'CRITICAL',
  },
  {
    id: 6,
    title: 'EUROPA ICE PLUMES CONTAIN AMINO ACID SIGNATURES',
    summary: 'Data from Juno flyby reveals spectroscopic evidence of glycine and alanine in ice particles ejected from Europa subsurface ocean. Mission planners accelerating Clipper timeline.',
    source: 'JPL PASADENA',
    timestamp: '18 CYCLES AGO',
    priority: 'HIGH',
  },
  {
    id: 7,
    title: 'DYSON SPHERE CANDIDATE IDENTIFIED IN KEPLER DATA',
    summary: 'Machine learning analysis of Kepler archival data flags KIC 8462852 variant with 99.7% probability of artificial megastructure. Follow-up observations scheduled.',
    source: 'PENN STATE SETI',
    timestamp: '21 CYCLES AGO',
    priority: 'MEDIUM',
  },
  {
    id: 8,
    title: 'TITAN METHANE LAKES SHOW SEASONAL LIFE SIGNATURES',
    summary: 'Cassini legacy data reanalysis indicates cyclical chemical changes in Kraken Mare consistent with metabolic processes. Theoretical models support silicon-based organisms.',
    source: 'ASTROBIOLOGY COUNCIL',
    timestamp: '24 CYCLES AGO',
    priority: 'HIGH',
  },
  {
    id: 9,
    title: 'INTERSTELLAR OBJECT 3I/BORISOV EXHIBITS ANOMALIES',
    summary: 'Third confirmed interstellar visitor shows unexpected acceleration beyond solar radiation pressure effects. Comparison to Oumuamua trajectory patterns ongoing.',
    source: 'HARVARD CFA',
    timestamp: '27 CYCLES AGO',
    priority: 'CRITICAL',
  },
  {
    id: 10,
    title: 'VENUS PHOSPHINE CONFIRMED BY MULTIPLE TEAMS',
    summary: 'Independent verification from ALMA and JCMT confirms phosphine gas at 20ppb in Venusian clouds. No known abiotic production mechanism at this concentration.',
    source: 'CARDIFF UNIVERSITY',
    timestamp: '30 CYCLES AGO',
    priority: 'HIGH',
  },
  {
    id: 11,
    title: 'TABBY\'S STAR DIMMING FOLLOWS ENCODED PATTERN',
    summary: 'Long-term monitoring reveals KIC 8462852 flux variations contain information content exceeding random noise by 8 standard deviations. Decryption efforts initiated.',
    source: 'BREAKTHROUGH LISTEN',
    timestamp: '33 CYCLES AGO',
    priority: 'CRITICAL',
  },
  {
    id: 12,
    title: 'GRAVITATIONAL WAVE BURST FROM UNEXPECTED SOURCE',
    summary: 'LIGO-Virgo-KAGRA network detects signal inconsistent with merger events. Waveform analysis suggests artificial gravitational manipulation. Coordinates classified.',
    source: 'LIGO CONSORTIUM',
    timestamp: '36 CYCLES AGO',
    priority: 'CLASSIFIED',
  },
]

const priorityColors: Record<string, string> = {
  CRITICAL: '#ff3366',
  HIGH: '#ffaa00',
  MEDIUM: '#00d4ff',
  CLASSIFIED: '#9d4edd',
}

export default function NewsPanel({ currentIndex }: NewsPanelProps) {
  const displayedNews = [
    spaceNews[currentIndex % spaceNews.length],
    spaceNews[(currentIndex + 1) % spaceNews.length],
    spaceNews[(currentIndex + 2) % spaceNews.length],
  ]

  return (
    <div className="h-full">
      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
        <div className="w-2 h-2 md:w-3 md:h-3 bg-[#39ff14] rounded-full animate-pulse" />
        <h2 className="font-orbitron text-sm md:text-lg text-[#ffaa00] tracking-wider">
          INCOMING TRANSMISSIONS
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[#ffaa00]/50 to-transparent" />
      </div>

      <div className="grid gap-3 md:gap-4">
        {displayedNews.map((news, index) => (
          <motion.article
            key={news.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative bg-[#0a0a0f]/80 border border-[#39ff14]/30 rounded-lg overflow-hidden group hover:border-[#39ff14]/60 transition-colors"
          >
            {/* Priority indicator */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1"
              style={{ backgroundColor: priorityColors[news.priority] }}
            />

            <div className="p-3 md:p-4 pl-4 md:pl-6">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[8px] md:text-[10px] font-vt323">
                  <span
                    className="px-1.5 md:px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: `${priorityColors[news.priority]}20`,
                      color: priorityColors[news.priority],
                    }}
                  >
                    {news.priority}
                  </span>
                  <span className="text-[#39ff14]/60">{news.source}</span>
                  <span className="text-[#39ff14]/40">{news.timestamp}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-orbitron text-xs md:text-sm text-[#00d4ff] mb-2 leading-tight group-hover:text-[#39ff14] transition-colors">
                {news.title}
              </h3>

              {/* Summary */}
              <p className="font-vt323 text-xs md:text-sm text-[#39ff14]/70 leading-relaxed">
                {news.summary}
              </p>

              {/* Decorative corner */}
              <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-[#39ff14]/20 rounded-br-lg" />
            </div>
          </motion.article>
        ))}
      </div>

      {/* Terminal-style footer */}
      <div className="mt-3 md:mt-4 p-2 md:p-3 bg-[#0a0a0f]/60 border border-[#39ff14]/20 rounded font-vt323 text-[10px] md:text-xs">
        <div className="flex flex-wrap items-center gap-2 text-[#39ff14]/50">
          <span className="animate-pulse">_</span>
          <span>MONITORING {spaceNews.length} ACTIVE CHANNELS</span>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:inline">DECRYPTION STATUS: NOMINAL</span>
          <span className="hidden md:inline">|</span>
          <span className="text-[#ffaa00]">SIGNAL STRENGTH: 97.3%</span>
        </div>
      </div>
    </div>
  )
}
