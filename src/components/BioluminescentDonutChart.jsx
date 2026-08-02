import React from 'react'
import { motion } from 'framer-motion'

export default function BioluminescentDonutChart({
  percentage = 0,
  size = 140,
  strokeWidth = 12,
  label = 'Domínio Global',
  subLabel = ''
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Fundo do Anel */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-slate-200 dark:text-slate-800"
          />

          {/* Anel Bioluminescente com Gradiente Neon */}
          <defs>
            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f2b544" />
              <stop offset="50%" stopColor="#0e7490" />
              <stop offset="100%" stopColor="#5cc8d7" />
            </linearGradient>
            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#neonGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeLinecap="round"
            fill="transparent"
            filter="url(#glowFilter)"
          />
        </svg>

        {/* Texto Central de Porcentagem */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.span
            className="text-2xl font-black text-slate-800 dark:text-white"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.round(percentage)}%
          </motion.span>
          {subLabel && (
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
              {subLabel}
            </span>
          )}
        </div>
      </div>

      <span className="mt-3 text-xs font-bold uppercase tracking-wider text-amber-500">
        {label}
      </span>
    </div>
  )
}
