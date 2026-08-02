import '@testing-library/jest-dom/vitest'

const values = new Map()
const localStorageMock = {
  getItem(key) {
    return values.has(key) ? values.get(key) : null
  },
  setItem(key, value) {
    values.set(key, String(value))
  },
  removeItem(key) {
    values.delete(key)
  },
  clear() {
    values.clear()
  },
  key(index) {
    return [...values.keys()][index] ?? null
  },
  get length() {
    return values.size
  },
}

Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: localStorageMock,
})
