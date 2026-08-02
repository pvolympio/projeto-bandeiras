import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function WavyFlag3D({ flagUrl, countryName }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="relative inline-block my-4 group">
      {/* Moldura da Bandeira com 3D Perspective Floating Effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="relative overflow-hidden rounded-2xl shadow-2xl border-2 border-white/60 dark:border-slate-700/80 bg-slate-900/10 backdrop-blur-md"
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Bandeira com Proporções Originais Preservadas (Sem Distorção/Sem Cortes) */}
        <img
          src={flagUrl}
          alt={`Bandeira de ${countryName}`}
          onLoad={() => setIsLoaded(true)}
          className={`w-full max-w-md h-auto max-h-[280px] object-contain mx-auto block transition-all duration-500 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        />

        {/* Camada Animada de Sombra e Reflexo de Tecido em Movimento (Cloth Wave Overlay) */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40 group-hover:opacity-60 transition-opacity"
          style={{
            background: `linear-gradient(
              115deg,
              transparent 20%,
              rgba(255, 255, 255, 0.4) 35%,
              rgba(0, 0, 0, 0.3) 50%,
              rgba(255, 255, 255, 0.4) 65%,
              transparent 80%
            )`,
            backgroundSize: '200% 200%',
            animation: 'clothWave 4s ease-in-out infinite alternate',
          }}
        />

        {/* Brilho Glossy nos Cantos */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/30" />
      </motion.div>

      {/* Tag Flutuante de Alta Definição */}
      <div className="absolute -top-3 left-3 bg-slate-950/85 text-amber-400 text-[11px] font-extrabold px-3 py-1 rounded-full backdrop-blur-md border border-amber-500/40 shadow-lg flex items-center gap-1.5 z-10">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span>Vetor HD Proporcional</span>
      </div>
    </div>
  )
}
