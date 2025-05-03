# aluminum-journal

Este projeto está pronto para ser hospedado em plataformas modernas como Vercel, Heroku ou Render.

## Dependency Resolution

This project uses React 19, which has compatibility issues with certain dependencies. Specifically, the `vaul` package (used for drawer components) has a peer dependency requirement of React 16.8-18.0, but this project uses React 19.

### Solution Implemented

Para resolver este conflito de dependências, as seguintes alterações foram feitas:

1. Removida a flag `--force` do script de build, pois não é suportada pelo Next.js
2. Mantido o script de setup que usa a flag `--force` para instalação de dependências

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "setup": "npm install --force"
}
```

### Installation

Para instalar as dependências, execute:

```bash
npm run setup
```

Ou manualmente use:

```bash
npm install --force
```

## Estrutura Recomendada
- O diretório `app` contém as páginas principais do projeto.
- Certifique-se de que todos os arquivos de página estejam dentro da pasta `app`.
- O arquivo `not-found.tsx` já está corretamente posicionado em `app/not-found.tsx`.

## Deploy Gratuito
Recomendamos o uso do [Render.com](https://render.com/) para hospedagem gratuita de projetos Next.js.

### Passos para Deploy no Render.com
1. Faça login ou crie uma conta em [https://render.com/](https://render.com/).
2. Clique em "New Web Service" e conecte seu repositório do GitHub.
3. Escolha o repositório deste projeto.
4. Configure o build command para:
   ```
   npm run setup && npm run build
   ```
5. Configure o start command para:
   ```
   npm start
   ```
6. Selecione o ambiente Node.js e a branch desejada.
7. Clique em "Create Web Service".

Pronto! Seu projeto será implantado automaticamente.

## Outras Plataformas
- [Vercel](https://vercel.com/) (foco em Next.js, integração fácil com GitHub)
- [Heroku](https://heroku.com/) (pode exigir configuração extra para SSR)

Se precisar de ajuda, consulte a documentação oficial da plataforma escolhida.