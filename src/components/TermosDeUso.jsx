function TermosDeUso() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6 sm:p-12 transition-colors">
      <article className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-amber-600 dark:text-amber-500">Termos de uso</h1>

        <p className="mb-4">
          Ao acessar o <strong>Bandeiras do Mundo</strong>, você concorda em usar o projeto de forma lícita e responsável.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">1. Finalidade educacional</h2>
        <p className="mb-4 text-sm">
          O conteúdo e os jogos são oferecidos para estudo, consulta e entretenimento. Você pode acessar e compartilhar links para as páginas, respeitando os direitos associados às fontes e aos recursos utilizados.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">2. Uso permitido</h2>
        <ul className="list-disc pl-6 mb-4 text-sm space-y-2">
          <li>Não tente interromper, sobrecarregar ou explorar indevidamente o serviço.</li>
          <li>Não use o projeto para distribuir conteúdo ilegal ou prejudicial.</li>
          <li>Não apresente o conteúdo do projeto como se fosse uma publicação oficial de governos ou organizações internacionais.</li>
        </ul>

        <h2 className="text-xl font-bold mt-6 mb-3">3. Precisão e atualizações</h2>
        <p className="mb-4 text-sm">
          Os dados são revisados para uso educacional, mas países, populações e informações institucionais podem mudar. Correções podem ser enviadas pela página de contato.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">4. Disponibilidade</h2>
        <p className="mb-4 text-sm">
          O projeto pode receber atualizações, ficar temporariamente indisponível ou ter funcionalidades alteradas para melhorar segurança, desempenho e conteúdo.
        </p>

        <p className="mt-8 text-xs text-gray-500 border-t pt-4 dark:border-gray-600">
          Versão vigente em <strong>{new Date().getFullYear()}</strong>.
        </p>
      </article>
    </main>
  )
}

export default TermosDeUso
