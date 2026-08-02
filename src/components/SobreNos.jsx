import { BookOpen, Flag, Heart } from 'lucide-react'

function SobreNos() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6 sm:p-12 transition-colors">
      <div className="max-w-4xl mx-auto">
        <p className="atlas-kicker">Projeto educacional independente</p>
        <h1 className="text-4xl sm:text-6xl font-black mb-8">Geografia aprendida pela curiosidade.</h1>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Flag className="w-8 h-8 text-amber-500" aria-hidden="true" />
            <h2 className="text-2xl font-bold">A proposta</h2>
          </div>
          <p className="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            Bandeiras são portas de entrada para história, cultura e localização. Este projeto reúne 193 países em uma experiência gratuita, em português, que combina consulta rápida com prática repetida.
          </p>

          <div className="grid md:grid-cols-2 gap-8 border-t border-gray-200 dark:border-gray-700 pt-8">
            <section>
              <BookOpen className="w-6 h-6 text-blue-500 mb-3" aria-hidden="true" />
              <h3 className="text-xl font-bold mb-2">Como o conteúdo evolui</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Validações automáticas conferem códigos, bandeiras e áudios. Informações editoriais recebem correções contínuas e devem indicar quando são estimativas.
              </p>
            </section>

            <section>
              <Heart className="w-6 h-6 text-red-500 mb-3" aria-hidden="true" />
              <h3 className="text-xl font-bold mb-2">Acesso sem cadastro</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Recordes e progresso ficam no próprio dispositivo. Você pode explorar e jogar sem criar uma conta.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SobreNos
