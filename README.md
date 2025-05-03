# aluminum-journal

Este projeto está pronto para ser hospedado em plataformas modernas como Vercel, Heroku ou Render.

## Dependency Resolution

This project uses React 19, which has compatibility issues with certain dependencies. Specifically, the `vaul` package (used for drawer components) has a peer dependency requirement of React 16.8-18.0, but this project uses React 19.

### Solution Implemented

To resolve this dependency conflict, the following changes have been made:

1. Added `--legacy-peer-deps` flag to the build script in package.json
2. Added an install script that uses the `--legacy-peer-deps` flag

```json
"scripts": {
  "dev": "next dev",
  "build": "next build --legacy-peer-deps",
  "start": "next start",
  "lint": "next lint",
  "install": "npm install --legacy-peer-deps"
}
```

### Installation

To install dependencies, run:

```bash
npm run install
```

Or manually use:

```bash
npm install --legacy-peer-deps
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
   npm install --legacy-peer-deps && npm run build
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