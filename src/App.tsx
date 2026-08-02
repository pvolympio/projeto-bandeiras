import { lazy, Suspense, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Route, Switch, useLocation } from 'wouter'
import HeaderPrincipal from './components/HeaderPrincipal'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'
import AtmosphericBackgroundCanvas from './components/AtmosphericBackgroundCanvas'

const Home = lazy(() => import('./components/FuncaoBandeiras'))
const QuizSelector = lazy(() => import('./components/QuizSelector'))
const QuizBandeira = lazy(() => import('./components/quizzes/QuizBandeira'))
const QuizCapital = lazy(() => import('./components/quizzes/QuizCapital'))
const QuizContinente = lazy(() => import('./components/quizzes/QuizContinente'))
const QuizNomePais = lazy(() => import('./components/quizzes/QuizNomePais'))
const QuizPopulacao = lazy(() => import('./components/quizzes/QuizPopulacao'))
const QuizRelampago = lazy(() => import('./components/quizzes/QuizRelampago'))
const Curiosidades = lazy(() => import('./components/Curiosidades'))
const PoliticaPrivacidade = lazy(() => import('./components/PoliticaPrivacidade'))
const TermosDeUso = lazy(() => import('./components/TermosDeUso'))
const SobreNos = lazy(() => import('./components/SobreNos'))
const Contato = lazy(() => import('./components/Contato'))
const Rankings = lazy(() => import('./components/Rankings'))
const Perfil = lazy(() => import('./components/Perfil'))
const PaisDetalhes = lazy(() => import('./components/PaisDetalhes'))
const NotFound = lazy(() => import('./components/NotFound'))

const ROUTE_META: Record<string, { title: string; description: string }> = {
  '/quiz/bandeira': {
    title: 'Quiz de bandeiras — Bandeiras do Mundo',
    description: 'Identifique a bandeira correta e acompanhe seu recorde.',
  },
  '/quiz/capital': {
    title: 'Quiz de capitais — Bandeiras do Mundo',
    description: 'Teste sua memória e descubra as capitais dos países.',
  },
  '/quiz/continente': {
    title: 'Quiz de continentes — Bandeiras do Mundo',
    description: 'Localize países nos continentes corretos.',
  },
  '/quiz/nome-pais': {
    title: 'Quiz de países — Bandeiras do Mundo',
    description: 'Reconheça bandeiras e escreva o nome dos países.',
  },
  '/quiz/populacao': {
    title: 'Quiz de população — Bandeiras do Mundo',
    description: 'Compare a população de diferentes países.',
  },
  '/quiz/relampago': {
    title: 'Quiz relâmpago — Bandeiras do Mundo',
    description: 'Acerte o máximo de bandeiras em 60 segundos.',
  },
  '/curiosidades': {
    title: 'Curiosidades geográficas — Bandeiras do Mundo',
    description: 'Descubra símbolos, histórias e fatos sobre países e bandeiras.',
  },
  '/rankings': {
    title: 'Rankings geográficos — Bandeiras do Mundo',
    description: 'Compare países por população, área e outros indicadores.',
  },
  '/perfil': {
    title: 'Meu atlas — Bandeiras do Mundo',
    description: 'Acompanhe recordes e países dominados neste dispositivo.',
  },
  '/sobre': {
    title: 'Sobre o projeto — Bandeiras do Mundo',
    description: 'Conheça a proposta educacional do Bandeiras do Mundo.',
  },
  '/contato': {
    title: 'Contato — Bandeiras do Mundo',
    description: 'Envie sugestões e correções para o projeto.',
  },
  '/politica-privacidade': {
    title: 'Política de privacidade — Bandeiras do Mundo',
    description: 'Entenda como preferências e dados locais são tratados.',
  },
  '/termos-de-uso': {
    title: 'Termos de uso — Bandeiras do Mundo',
    description: 'Consulte as condições de uso do projeto.',
  },
}

function RouteEffects() {
  const [location] = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location])

  return null
}

function RouteMeta() {
  const [location] = useLocation()
  const meta = ROUTE_META[location]

  if (!meta || location === '/' || location === '/quiz' || location.startsWith('/pais/')) return null

  const canonical = `https://bandeirasdomundo.com${location}`
  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
    </Helmet>
  )
}

function LoadingPage() {
  return (
    <div className="page-loading" role="status" aria-live="polite">
      <span className="page-loading__compass" aria-hidden="true">✦</span>
      <span>Traçando a próxima rota…</span>
    </div>
  )
}

function App() {
  return (
    <div className="app-shell relative overflow-hidden">
      <AtmosphericBackgroundCanvas />
      <RouteEffects />
      <RouteMeta />
      <HeaderPrincipal />

      <div id="main-content" className="app-content relative z-10">
        <Suspense fallback={<LoadingPage />}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/quiz" component={QuizSelector} />
            <Route path="/quiz/bandeira" component={QuizBandeira} />
            <Route path="/quiz/capital" component={QuizCapital} />
            <Route path="/quiz/continente" component={QuizContinente} />
            <Route path="/quiz/nome-pais" component={QuizNomePais} />
            <Route path="/quiz/populacao" component={QuizPopulacao} />
            <Route path="/quiz/relampago" component={QuizRelampago} />
            <Route path="/curiosidades" component={Curiosidades} />
            <Route path="/sobre" component={SobreNos} />
            <Route path="/politica-privacidade" component={PoliticaPrivacidade} />
            <Route path="/termos-de-uso" component={TermosDeUso} />
            <Route path="/contato" component={Contato} />
            <Route path="/rankings" component={Rankings} />
            <Route path="/perfil" component={Perfil} />
            <Route path="/pais/:code" component={PaisDetalhes} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </div>

      <Footer />
      <CookieConsent />
    </div>
  )
}

export default App
