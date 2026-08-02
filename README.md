# Bandeiras do Mundo

Atlas interativo em português com 193 países e seis modos de quiz. A aplicação funciona sem cadastro: recordes, domínio de países, tema e som ficam no próprio navegador.

## Tecnologias

- React 18 e Vite 8
- TypeScript incremental
- Wouter para rotas leves
- Tailwind CSS e CSS autoral
- Vitest e Testing Library
- PWA com service worker próprio

## Executar localmente

Requisitos: Node.js 24 ou superior e npm.

```bash
npm install
npm run dev
```

O endereço local será exibido pelo Vite.

## Verificações

```bash
npm run lint          # qualidade e regras de hooks
npm run typecheck     # configuração TypeScript
npm test              # testes automatizados
npm run validate:data # códigos, bandeiras e áudios
npm run build         # bundle de produção
npm run check         # executa toda a sequência acima
```

## Dados e arquivos

- `src/data/countries.js`: catálogo editorial em português.
- `src/data/countryMetadata.js`: área, sub-região e nome oficial em um formato compacto.
- `public/flags`: bandeiras em SVG.
- `public/audio/countries`: pronúncias em MP3.
- `src/data/countryDetails.js`: textos editoriais específicos.

Ao atualizar a dependência de referência `world-countries`, regenere o arquivo compacto:

```bash
npm run generate:metadata
npm run validate:data
```

O sitemap é atualizado com:

```bash
npm run generate:sitemap
```

## Privacidade

O script de anúncios não é incluído no HTML inicial. Ele é carregado somente depois da escolha explícita “Permitir anúncios”. A opção “Só o necessário” mantém todos os quizzes disponíveis.

## PWA

O manifesto fica em `public/manifest.webmanifest`. O service worker:

- mantém um shell mínimo para abertura offline;
- guarda bandeiras e áudios apenas quando são solicitados;
- remove caches antigos ao receber uma nova versão.

Ao alterar a estratégia de cache, incremente `VERSION` em `public/sw.js`.

## Deploy

O arquivo `vercel.json` direciona as rotas da SPA para `index.html`. Antes de publicar:

```bash
npm run check
```

Depois confirme no ambiente final:

- navegação direta para uma página de país;
- instalação como aplicativo;
- escolha de privacidade;
- compartilhamento e áudio em dispositivo real.
