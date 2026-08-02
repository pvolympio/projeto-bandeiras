import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import worldCountries from 'world-countries'
import localCountries from '../src/data/countries.js'

const localCodes = new Set(localCountries.map(({ code }) => code))
const metadata = Object.fromEntries(
  worldCountries
    .filter(({ cca2 }) => localCodes.has(cca2?.toLowerCase()))
    .map((country) => [
      country.cca2.toLowerCase(),
      {
        officialName: country.translations?.por?.official || country.name.official,
        subregion: country.subregion || '',
        area: country.area || 0,
      },
    ]),
)

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputPath = path.join(projectRoot, 'src', 'data', 'countryMetadata.js')
const output = `// Gerado por scripts/generateCountryMetadata.mjs a partir de world-countries.\nexport default ${JSON.stringify(metadata, null, 2)}\n`

fs.writeFileSync(outputPath, output, 'utf8')
console.log(`Metadados compactos gerados para ${Object.keys(metadata).length} países.`)
