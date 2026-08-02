import { useState } from 'react'
import { allCountries } from '../data/countryLoader'

export function createQuestionPool(countries, random = Math.random) {
  let remaining = [...countries]

  return {
    next() {
      if (remaining.length === 0) remaining = [...countries]
      const index = Math.floor(random() * remaining.length)
      return remaining.splice(index, 1)[0]
    },
    reset() {
      remaining = [...countries]
    },
    size() {
      return remaining.length
    },
  }
}

export function useQuestionPool() {
  const [pool] = useState(() => createQuestionPool(allCountries))

  return {
    getNextCountry: pool.next,
    resetPool: pool.reset,
  }
}
