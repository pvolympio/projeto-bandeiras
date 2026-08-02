import { createContext, useContext } from 'react'

export const SoundSettingsContext = createContext(null)

export function useSoundSettings() {
  const settings = useContext(SoundSettingsContext)
  if (!settings) throw new Error('useSoundSettings deve ser usado dentro de SoundProvider')
  return settings
}
