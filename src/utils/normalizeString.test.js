import { describe, expect, it } from 'vitest'
import { normalizeString } from './normalizeString'

describe('normalizeString', () => {
  it('remove acentos, caixa e espaços externos', () => {
    expect(normalizeString('  São Tomé e Príncipe  ')).toBe('sao tome e principe')
  })

  it('aceita valores vazios', () => {
    expect(normalizeString('')).toBe('')
    expect(normalizeString(null)).toBe('')
  })
})
