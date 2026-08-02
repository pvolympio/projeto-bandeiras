import { ArrowRight, Flag, Map, MapPin, Radio, Timer, Type, Users } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'wouter'

const quizzes = [
  {
    id: 'bandeira',
    title: 'Adivinhe a bandeira',
    description: 'Escolha a bandeira correta para cada país.',
    path: '/quiz/bandeira',
    icon: Flag,
    coordinate: 'VISUAL · 04 OPÇÕES',
    tone: 'blue',
  },
  {
    id: 'capital',
    title: 'Capitais',
    description: 'Escreva a capital do país apresentado.',
    path: '/quiz/capital',
    icon: MapPin,
    coordinate: 'MEMÓRIA · TEXTO',
    tone: 'green',
  },
  {
    id: 'nome-pais',
    title: 'Nome do país',
    description: 'Reconheça a bandeira e escreva o nome.',
    path: '/quiz/nome-pais',
    icon: Type,
    coordinate: 'ESCRITA · VISUAL',
    tone: 'red',
  },
  {
    id: 'relampago',
    title: 'Quiz relâmpago',
    description: 'Acerte o máximo possível em 60 segundos.',
    path: '/quiz/relampago',
    icon: Timer,
    coordinate: 'CRONÔMETRO · 60 S',
    tone: 'yellow',
  },
  {
    id: 'populacao',
    title: 'População',
    description: 'Compare dois países e encontre o mais populoso.',
    path: '/quiz/populacao',
    icon: Users,
    coordinate: 'COMPARAÇÃO · DADOS',
    tone: 'purple',
  },
  {
    id: 'continente',
    title: 'Continentes',
    description: 'Localize cada país na região correta do mapa.',
    path: '/quiz/continente',
    icon: Map,
    coordinate: 'LOCALIZAÇÃO · MAPA',
    tone: 'cyan',
  },
]

function QuizSelector() {
  const getHighScore = (id) => Number(localStorage.getItem(`highscore_${id}`) || 0)

  return (
    <main className="quiz-index">
      <Helmet>
        <title>Quizzes de geografia — Bandeiras do Mundo</title>
        <meta
          name="description"
          content="Escolha entre seis quizzes de bandeiras, capitais, continentes, população e geografia."
        />
        <link rel="canonical" href="https://bandeirasdomundo.com/quiz" />
      </Helmet>

      <header className="inner-hero">
        <div>
          <p className="atlas-kicker"><Radio aria-hidden="true" /> Central de sinais · 06 frequências</p>
          <h1>Qual habilidade você quer <span>ligar agora?</span></h1>
        </div>
        <p>Escolha uma frequência. Cada modo estimula uma parte diferente da sua memória geográfica.</p>
      </header>

      <div className="quiz-grid">
        {quizzes.map((quiz) => {
          const Icon = quiz.icon
          const score = getHighScore(quiz.id)

          return (
            <Link
              key={quiz.path}
              href={quiz.path}
              className={`quiz-card quiz-card--${quiz.tone}`}
            >
              <span className="quiz-card__pulse" aria-hidden="true"><i /><i /><i /><i /><i /></span>
              <span className="quiz-card__top">
                <span className="quiz-card__icon"><Icon aria-hidden="true" /></span>
                <span className="quiz-card__coordinate">{quiz.coordinate}</span>
              </span>
              <span className="quiz-card__body">
                <h2>{quiz.title}</h2>
                <p>{quiz.description}</p>
              </span>
              <span className="quiz-card__footer">
                <span>Recorde <strong>{score}</strong></span>
                <span>Entrar <ArrowRight aria-hidden="true" /></span>
              </span>
            </Link>
          )
        })}
      </div>
    </main>
  )
}

export default QuizSelector
