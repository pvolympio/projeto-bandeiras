import { describe, expect, it } from 'vitest'
import { createQuestionPool } from './useQuestionPool'

const sample = [{ code: 'br' }, { code: 'jp' }, { code: 'za' }]

describe('createQuestionPool', () => {
  it('não repete países antes de consumir o ciclo', () => {
    const pool = createQuestionPool(sample, () => 0)
    const cycle = [pool.next(), pool.next(), pool.next()]

    expect(new Set(cycle.map(({ code }) => code)).size).toBe(sample.length)
    expect(pool.size()).toBe(0)
  })

  it('recomeça automaticamente depois do último país', () => {
    const pool = createQuestionPool(sample, () => 0)
    sample.forEach(() => pool.next())

    expect(pool.next()).toEqual(sample[0])
  })
})
