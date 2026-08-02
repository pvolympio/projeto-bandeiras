import { describe, expect, it } from 'vitest'
import countries from './countries'

describe('catálogo de países', () => {
  it('contém os 193 membros da ONU sem códigos duplicados', () => {
    expect(countries).toHaveLength(193)
    expect(new Set(countries.map(({ code }) => code)).size).toBe(193)
  })

  it('mantém os campos usados pelos quizzes', () => {
    for (const country of countries) {
      expect(country).toEqual(expect.objectContaining({
        code: expect.stringMatching(/^[a-z]{2}$/),
        name: expect.any(String),
        capital: expect.any(String),
        continent: expect.any(String),
        population: expect.any(Number),
      }))
    }
  })
})
