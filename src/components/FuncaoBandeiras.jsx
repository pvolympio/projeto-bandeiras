import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Compass, Radio, Search, Sparkles, Star, X, Zap } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'wouter'
import { allCountries } from '../data/countryLoader'
import { useMastery } from '../hooks/useMastery'
import InteractiveWorldMap from './InteractiveWorldMap'
import { FlagGridSkeleton } from './FlagSkeletonLoader'

const FEATURED_CODES = ['br', 'jp', 'za', 'ca', 'in', 'fr', 'mx', 'nz', 'kr', 'eg', 'ar', 'no']
const ORBIT_CODES = ['br', 'jp', 'za', 'ca', 'in', 'mx', 'nz', 'eg']
const PAGE_SIZE = 48

function normalizeForSearch(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function FuncaoBandeiras() {
  const [searchTerm, setSearchTerm] = useState('')
  const [continentFilter, setContinentFilter] = useState('todos')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const { isMastered } = useMastery()

  const countries = useMemo(
    () => [...allCountries].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR')),
    [],
  )

  const masteredCount = useMemo(
    () => countries.filter((c) => isMastered(c.code)).length,
    [countries, isMastered],
  )

  const continents = useMemo(
    () => ['todos', ...new Set(countries.map((country) => country.continent).filter(Boolean))],
    [countries],
  )

  const featuredCountries = useMemo(
    () => FEATURED_CODES.map((code) => countries.find((country) => country.code === code)).filter(Boolean),
    [countries],
  )

  const orbitCountries = useMemo(
    () => ORBIT_CODES.map((code) => countries.find((country) => country.code === code)).filter(Boolean),
    [countries],
  )

  const filteredCountries = useMemo(() => {
    const term = normalizeForSearch(searchTerm)

    return countries.filter((country) => {
      if (continentFilter !== 'todos' && country.continent !== continentFilter) return false
      if (!term) return true

      return [country.name, country.code, country.capital]
        .some((value) => normalizeForSearch(value).includes(term))
    })
  }, [continentFilter, countries, searchTerm])

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [continentFilter, searchTerm])

  const hasFilters = Boolean(searchTerm) || continentFilter !== 'todos'
  const clearFilters = () => {
    setSearchTerm('')
    setContinentFilter('todos')
  }

  return (
    <main className="home-page">
      <Helmet>
        <title>Bandeiras do Mundo — Aprenda geografia jogando</title>
        <meta
          name="description"
          content="Explore as bandeiras de 193 países e teste seus conhecimentos em quizzes de capitais, continentes e geografia."
        />
        <link rel="canonical" href="https://bandeirasdomundo.com/" />
        <meta property="og:title" content="Bandeiras do Mundo — Aprenda geografia jogando" />
        <meta property="og:description" content="Um atlas interativo com 193 países e seis modos de jogo." />
        <meta property="og:url" content="https://bandeirasdomundo.com/" />
      </Helmet>

      <section className="atlas-hero" aria-labelledby="hero-title">
        <div className="hero-signal-lines" aria-hidden="true"><i /><i /><i /></div>
        <div className="atlas-hero__grid">
          <div className="atlas-hero__copy">
            <p className="atlas-kicker">
              <Radio aria-hidden="true" />
              Frequência global · 193 países
            </p>
            <h1 id="hero-title">
              Leia o mundo.
              <span>Pelas cores.</span>
            </h1>
            <p className="atlas-hero__lead">
              Bandeiras são sinais. Treine o olhar, conecte países e descubra uma nova forma de enxergar o planeta.
            </p>
            <div className="atlas-hero__actions">
              <Link href="/quiz/bandeira" className="button button--primary">
                Captar primeiro sinal <Zap aria-hidden="true" />
              </Link>
              <a href="#atlas" className="button button--quiet">Ver todos os países</a>
            </div>
            <div className="hero-proof" aria-label="Resumo da plataforma">
              <span><strong>06</strong> modos de jogo</span>
              <span><strong>193</strong> países</span>
              <span><strong>∞</strong> novas rodadas</span>
            </div>
          </div>

          <div className="signal-orbit" aria-label="Constelação de bandeiras do mundo">
            <div className="signal-orbit__rings" aria-hidden="true"><i /><i /><i /></div>
            <div className="signal-orbit__core">
              <span>Sinais ativos</span>
              <strong>193</strong>
              <small>AO VIVO</small>
            </div>
            {orbitCountries.map((country, index) => (
              <Link
                key={country.code}
                href={`/pais/${country.code}`}
                className="signal-orbit__flag"
                style={{ '--orbit-angle': `${index * 45}deg` }}
                title={country.name}
              >
                <img src={`/flags/${country.code}.svg`} alt={`Bandeira de ${country.name}`} />
              </Link>
            ))}
            <Link href="/perfil" className="signal-orbit__progress">
              Meu sinal <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="flag-ribbon" aria-label="Bandeiras em destaque">
          <div className="flag-ribbon__track">
            {[...featuredCountries, ...featuredCountries].map((country, index) => (
              <Link
                key={`${country.code}-${index}`}
                href={`/pais/${country.code}`}
                className="flag-ribbon__item"
                aria-hidden={index >= featuredCountries.length}
                tabIndex={index >= featuredCountries.length ? -1 : undefined}
              >
                <img src={`/flags/${country.code}.svg`} alt="" />
                <span>{country.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="atlas" className="country-explorer" aria-labelledby="explorer-title">
        {/* MAPA GLOBAL INTERATIVO */}
        <InteractiveWorldMap
          selectedContinent={continentFilter}
          onSelectContinent={setContinentFilter}
          masteredCount={masteredCount}
          totalCount={countries.length}
        />

        <div className="section-heading">
          <div>
            <p className="section-heading__eyebrow">Diretório de sinais</p>
            <h2 id="explorer-title">Sintonize um país.</h2>
          </div>
          <p>{filteredCountries.length} {filteredCountries.length === 1 ? 'destino encontrado' : 'destinos encontrados'}</p>
        </div>

        <div className="atlas-filters" role="search">
          <label className="search-field">
            <span className="sr-only">Pesquisar país, código ou capital</span>
            <Search aria-hidden="true" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="País, código ou capital…"
            />
          </label>

          <label className="continent-field">
            <span className="sr-only">Filtrar por continente</span>
            <select value={continentFilter} onChange={(event) => setContinentFilter(event.target.value)}>
              {continents.map((continent) => (
                <option key={continent} value={continent}>
                  {continent === 'todos' ? 'Todos os continentes' : continent}
                </option>
              ))}
            </select>
          </label>

          {hasFilters && (
            <button className="clear-filter" type="button" onClick={clearFilters}>
              <X aria-hidden="true" /> Limpar
            </button>
          )}
        </div>

        {filteredCountries.length > 0 ? (
          <>
            <div className="country-grid">
              {filteredCountries.slice(0, visibleCount).map((country) => {
                const mastered = isMastered(country.code)
                return (
                  <Link
                    key={country.code}
                    href={`/pais/${country.code}`}
                    className={`country-card country-card-3d ${mastered ? 'is-mastered' : ''} country-card--${normalizeForSearch(country.continent).replaceAll(' ', '-')}`}
                  >
                    <span className="country-card__code">{country.code.toUpperCase()}</span>
                    {mastered && (
                      <span className="country-card__mastery" title="País dominado">
                        <Star aria-hidden="true" />
                        <span className="sr-only">País dominado</span>
                      </span>
                    )}
                    <span className="country-card__flag">
                      <img
                        src={`/flags/${country.code}.svg`}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <strong>{country.name}</strong>
                    <span>{country.continent}</span>
                  </Link>
                )
              })}
            </div>

            {visibleCount < filteredCountries.length && (
              <button
                className="button button--load"
                type="button"
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              >
                Mostrar mais países
              </button>
            )}
          </>
        ) : (
          <div className="empty-atlas">
            <Compass aria-hidden="true" />
            <h3>Nenhuma rota encontrada</h3>
            <p>Tente outro nome, uma capital ou remova o filtro de continente.</p>
            <button type="button" onClick={clearFilters}>Ver todos os países</button>
          </div>
        )}
      </section>

      <section className="discovery-callout" aria-labelledby="discovery-title">
        <div>
          <p className="section-heading__eyebrow"><Sparkles aria-hidden="true" /> Além da superfície</p>
          <h2 id="discovery-title">Toda cor guarda uma história.</h2>
        </div>
        <p>
          Descubra símbolos, semelhanças inesperadas e fatos verificados sobre a geografia de cada país.
        </p>
        <Link href="/curiosidades">Decodificar histórias <ArrowRight aria-hidden="true" /></Link>
      </section>
    </main>
  )
}

export default FuncaoBandeiras
