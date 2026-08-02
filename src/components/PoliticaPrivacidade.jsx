function PoliticaPrivacidade() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6 sm:p-12 transition-colors">
      <article className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-amber-600 dark:text-amber-500">Política de privacidade</h1>

        <p className="mb-4">
          O <strong>Bandeiras do Mundo</strong> foi projetado para funcionar sem cadastro. Recordes, domínio de países, tema e som ficam armazenados localmente no seu dispositivo.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">1. Armazenamento necessário</h2>
        <p className="mb-4 text-sm leading-relaxed">
          Usamos o armazenamento do navegador para lembrar suas preferências e seu progresso. Esses dados não identificam você e não são enviados ao servidor pelo aplicativo.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">2. Anúncios opcionais</h2>
        <p className="mb-4 text-sm leading-relaxed">
          O Google AdSense só é carregado depois que você escolhe “Permitir anúncios” no aviso de privacidade. Ao permitir, o fornecedor pode usar cookies ou tecnologias semelhantes conforme as próprias políticas. A opção “Só o necessário” mantém o jogo funcional sem carregar o script de anúncios.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">3. Links externos</h2>
        <p className="mb-4 text-sm">
          Algumas páginas podem apontar para fontes externas. As práticas de privacidade desses serviços são independentes deste projeto.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">4. Alterar sua escolha</h2>
        <p className="mb-4 text-sm">
          Você pode limpar os dados do site nas configurações do navegador para redefinir o consentimento, os recordes e as preferências locais.
        </p>

        <p className="mt-8 text-xs text-gray-500 border-t pt-4 dark:border-gray-600">
          Política revisada em <strong>julho de 2026</strong>.
        </p>
      </article>
    </main>
  )
}

export default PoliticaPrivacidade
