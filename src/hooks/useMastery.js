import { useCallback, useState } from 'react'
import { readJson, writeJson } from '../utils/storage'

const MASTERY_KEY = 'country_mastery'
const MASTERY_THRESHOLD = 3

export function useMastery() {
  const [masteryMap, setMasteryMap] = useState(() => readJson(MASTERY_KEY, {}))

  const incrementMastery = useCallback((countryCode) => {
    if (!countryCode) return

    setMasteryMap((currentMap) => {
      const nextMap = {
        ...currentMap,
        [countryCode]: (currentMap[countryCode] || 0) + 1,
      }
      writeJson(MASTERY_KEY, nextMap)
      return nextMap
    })
  }, [])

  const isMastered = useCallback(
    (countryCode) => (masteryMap[countryCode] || 0) >= MASTERY_THRESHOLD,
    [masteryMap],
  )

  const getMasteryLevel = useCallback(
    (countryCode) => masteryMap[countryCode] || 0,
    [masteryMap],
  )

  const getTotalMastered = useCallback(
    () => Object.values(masteryMap).filter((count) => count >= MASTERY_THRESHOLD).length,
    [masteryMap],
  )

  return {
    incrementMastery,
    isMastered,
    getMasteryLevel,
    getTotalMastered,
    MASTERY_THRESHOLD,
  }
}
