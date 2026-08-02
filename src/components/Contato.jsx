import { Mail, MessageSquareText } from 'lucide-react'

function Contato() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6 sm:p-12 transition-colors">
      <div className="max-w-4xl mx-auto">
        <p className="atlas-kicker">Canal de correções</p>
        <h1 className="text-4xl sm:text-6xl font-black mb-5">Ajude este atlas a ficar melhor.</h1>
        <p className="mb-10 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Encontrou um dado impreciso, uma bandeira com problema ou tem uma ideia para os quizzes? Envie o país, a página e uma fonte quando possível.
        </p>

        <div className="bg-white dark:bg-gray-800 p-7 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <Mail className="w-8 h-8 text-amber-500 mb-4" aria-hidden="true" />
          <h2 className="text-xl font-bold mb-2">E-mail do projeto</h2>
          <a href="mailto:contato@bandeirasdomundo.com" className="text-amber-600 dark:text-amber-400 font-bold hover:underline">
            contato@bandeirasdomundo.com
          </a>
          <p className="flex items-center gap-2 text-sm text-gray-500 mt-5">
            <MessageSquareText className="w-4 h-4" aria-hidden="true" />
            Assunto sugerido: correção, acessibilidade, conteúdo ou parceria.
          </p>
        </div>
      </div>
    </main>
  )
}

export default Contato
