export function readJson(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    return stored === null ? fallback : JSON.parse(stored)
  } catch {
    return fallback
  }
}

export function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function readNumber(key, fallback = 0) {
  const value = Number(localStorage.getItem(key))
  return Number.isFinite(value) ? value : fallback
}
