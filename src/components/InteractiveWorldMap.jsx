import React, { useState } from 'react'
import { Compass, Globe, Sparkles } from 'lucide-react'

// Otimização de silhuetas SVG de continentes para exploração interativa
const CONTINENT_PATHS = {
  'América do Sul': 'M175,190 Q195,190 200,210 Q215,240 200,280 Q185,310 170,300 Q160,250 175,190 Z',
  'América do Norte': 'M110,60 Q180,50 200,100 Q190,140 160,170 Q120,160 90,130 Q80,90 110,60 Z',
  'Europa': 'M260,70 Q310,60 330,95 Q300,120 270,115 Q250,100 260,70 Z',
  'África': 'M250,130 Q310,120 320,180 Q300,240 260,250 Q235,190 250,130 Z',
  'Ásia': 'M330,60 Q440,50 450,130 Q400,180 340,140 Q310,100 330,60 Z',
  'Oceania': 'M410,210 Q470,210 470,260 Q420,280 400,250 Q390,230 410,210 Z',
  'Antártida': 'M150,340 Q350,330 450,340 Q350,355 150,340 Z',
}

const CONTINENT_NAMES = {
  'América do Sul': 'América do Sul',
  'América do Norte': 'América do Norte',
  'Europa': 'Europa',
  'África': 'África',
  'Ásia': 'Ásia',
  'Oceania': 'Oceania',
}

export default function InteractiveWorldMap({
  selectedContinent,
  onSelectContinent,
  masteredCount = 0,
  totalCount = 193
}) {
  const [hoveredContinent, setHoveredContinent] = useState(null)

  return (
    <div className="interactive-map-container glass-panel my-6 transition-all duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 px-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
            <Globe className="w-4 h-4 animate-spin-slow" />
            <span>Atlas Global Interativo</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            Navegação por Sinal Geográfico
          </h2>
        </div>

        <div className="flex items-center gap-3 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
            {masteredCount} de {totalCount} Países Dominados
          </span>
        </div>
      </div>

      <div className="relative w-full aspect-[21/9] min-h-[220px] flex items-center justify-center">
        <svg
          viewBox="0 0 540 360"
          className="world-map-svg w-full h-full drop-shadow-md select-none"
        >
          {/* Fundo de Grade Cartográfica */}
          <defs>
            <pattern id="gridPattern" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="540" height="360" fill="url(#gridPattern)" />

          {/* Continentes Interativos */}
          {Object.entries(CONTINENT_PATHS).map(([continent, dPath]) => {
            const isSelected = selectedContinent === continent
            const isHovered = hoveredContinent === continent

            return (
              <g key={continent}>
                <path
                  d={dPath}
                  className={`
                    transition-all duration-300
                    ${isSelected ? 'fill-amber-500 stroke-amber-600 scale-105' : 'fill-slate-300 dark:fill-slate-700'}
                    ${isHovered && !isSelected ? 'fill-cyan-500 opacity-90' : ''}
                  `}
                  onMouseEnter={() => setHoveredContinent(continent)}
                  onMouseLeave={() => setHoveredContinent(null)}
                  onClick={() => onSelectContinent(isSelected ? 'todos' : continent)}
                />
              </g>
            )
          })}
        </svg>

        {/* Floating Indicator Tooltip */}
        {(hoveredContinent || selectedContinent !== 'todos') && (
          <div className="absolute bottom-3 left-3 bg-slate-900/90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg backdrop-blur-md shadow-lg border border-slate-700 animate-fade-in flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>
              {hoveredContinent || selectedContinent}
            </span>
            <span className="text-amber-400 text-[10px]">
              (Clique para filtrar)
            </span>
          </div>
        )}
      </div>

      {/* Botões rápidos dos Continentes */}
      <div className="flex flex-wrap gap-2 mt-4 px-1">
        <button
          type="button"
          onClick={() => onSelectContinent('todos')}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
            selectedContinent === 'todos'
              ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
          }`}
        >
          Todos ({totalCount})
        </button>
        {Object.keys(CONTINENT_NAMES).map((cont) => (
          <button
            key={cont}
            type="button"
            onClick={() => onSelectContinent(selectedContinent === cont ? 'todos' : cont)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedContinent === cont
                ? 'bg-amber-500 text-slate-950 shadow-md scale-105 font-bold'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {cont}
          </button>
        ))}
      </div>
    </div>
  )
}
