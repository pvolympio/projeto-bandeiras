import { useMemo, useState } from 'react'
import { SoundSettingsContext } from './soundSettings'

export function SoundProvider({ children }) {
  const [isMuted, setIsMuted] = useState(
    () => localStorage.getItem('sound_muted') === 'true',
  )

  const value = useMemo(() => ({
    isMuted,
    toggleSound() {
      setIsMuted((current) => {
        const next = !current
        localStorage.setItem('sound_muted', String(next))
        return next
      })
    },
  }), [isMuted])

  return (
    <SoundSettingsContext.Provider value={value}>
      {children}
    </SoundSettingsContext.Provider>
  )
}
