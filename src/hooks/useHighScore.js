import { useCallback, useState } from 'react'
import { readNumber } from '../utils/storage'

export function useHighScore(quizId) {
  const storageKey = `highscore_${quizId}`
  const [highScore, setHighScore] = useState(() => readNumber(storageKey))

  const updateHighScore = useCallback((score) => {
    let isNewRecord = false
    setHighScore((current) => {
      if (score <= current) return current
      isNewRecord = true
      localStorage.setItem(storageKey, String(score))
      return score
    })
    return isNewRecord
  }, [storageKey])

  return { highScore, updateHighScore }
}
