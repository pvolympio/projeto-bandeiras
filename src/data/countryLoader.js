import localCountries from './countries'
import metadataByCode from './countryMetadata'

export const allCountries = localCountries.map((country) => {
  const metadata = metadataByCode[country.code] || {}

  return {
    ...country,
    officialName: metadata.officialName || country.name,
    subregion: metadata.subregion || '',
    area: metadata.area || 0,
  }
})
