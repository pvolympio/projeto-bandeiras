import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import countries from '../src/data/countries.js'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const flagsDir = path.join(projectRoot, 'public', 'flags')
const audioDir = path.join(projectRoot, 'public', 'audio', 'countries')

const listCodes = (directory, extension) => new Set(
  fs.readdirSync(directory)
    .filter((file) => file.endsWith(extension))
    .map((file) => file.slice(0, -extension.length).toLowerCase()),
)

const flagCodes = listCodes(flagsDir, '.svg')
const audioCodes = listCodes(audioDir, '.mp3')
const countryCodes = countries.map(({ code }) => code.toLowerCase())
const uniqueCodes = new Set(countryCodes)
const problems = []

if (countries.length !== 193) problems.push(`Esperados 193 países; encontrados ${countries.length}.`)
if (uniqueCodes.size !== countries.length) problems.push('Existem códigos de país duplicados.')

for (const country of countries) {
  if (!/^[a-z]{2}$/.test(country.code)) problems.push(`Código inválido: ${country.code}`)
  if (!country.name || !country.capital || !country.continent) {
    problems.push(`Dados básicos incompletos para ${country.code}.`)
  }
  if (!flagCodes.has(country.code)) problems.push(`Bandeira ausente: ${country.code}.svg`)
  if (!audioCodes.has(country.code)) problems.push(`Áudio ausente: ${country.code}.mp3`)
}

if (problems.length > 0) {
  console.error(['Validação de dados falhou:', ...problems.map((problem) => `- ${problem}`)].join('\n'))
  process.exit(1)
}

console.log(`Dados validados: ${countries.length} países, ${flagCodes.size} bandeiras e ${audioCodes.size} áudios.`)
