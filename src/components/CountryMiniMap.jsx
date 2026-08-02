import React from 'react'
import { MapPin } from 'lucide-react'

const CONTINENT_HIGHLIGHTS = {
  'América do Sul': { cx: 185, cy: 235, r: 40 },
  'América do Norte': { cx: 145, cy: 110, r: 50 },
  'Europa': { cx: 285, cy: 90, r: 35 },
  'África': { cx: 275, cy: 190, r: 45 },
  'Ásia': { cx: 380, cy: 110, r: 60 },
  'Oceania': { cx: 430, cy: 240, r: 35 },
  'Antártida': { cx: 300, cy: 340, r: 50 }
}

export default function CountryMiniMap({ countryName, continent, capital }) {
  const coords = CONTINENT_HIGHLIGHTS[continent] || { cx: 270, cy: 180, r: 40 }

  return (
    <div className="glass-panel p-4 rounded-2xl relative overflow-hidden flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
          Localização Geográfica
        </span>
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          {continent}
        </span>
      </div>

      <div className="relative w-full aspect-[2/1] rounded-xl overflow-hidden bg-slate-900/10 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800">
        <svg viewBox="0 0 540 360" className="w-full h-full">
          {/* Fundo com grid sutil */}
          <rect width="540" height="360" fill="none" />
          
          {/* Anel Pulsante de Radar no Continente */}
          <circle
            cx={coords.cx}
            cy={coords.cy}
            r={coords.r}
            className="fill-amber-500/20 stroke-amber-500 animate-pulse stroke-2"
          />
          <circle
            cx={coords.cx}
            cy={coords.cy}
            r={8}
            className="fill-amber-500 shadow-lg"
          />
          <circle
            cx={coords.cx}
            cy={coords.cy}
            r={3}
            className="fill-slate-950"
          />
        </svg>

        <div className="absolute bottom-2 right-2 bg-slate-900/85 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-md">
          {countryName} ({capital})
        </div>
      </div>
    </div>
  )
}
