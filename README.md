# PhyloGeni 

This is a Next.js project bootstrapped with `create-next-app`, added with **Chakra UI** and **TypeScript** setup. Start developing right away!


## 🔋 ⚡ Battery Packed template

- 🚀 **Next.js 13** - **React 18**
- ⛓️ **TypeScript**
- **Chakra-UI** v2
- ✔️ **toolings** for linting, formatting, and conventions configured 
  - `eslint`, `prettier`, `husky`, `lint-staged`, `commitlint`, `commitizen`, and `standard-version`
  - `pre-commit`, `pre-push`, `commit-msg`, `prepare-commit-msg` hook configured
- 🤖 **Automatic Dependency Update** with [Renovate](https://renovatebot.com/) 
- 🏎️ **Turbo** setup
- 🧪 **Playwright** E2E Test

## Pre-requisites

1. [Node.js](https://nodejs.org/en/) or nvm installed.
2. `pnpm` installed.

## Getting Started

1. You can clone the repo.

2. After cloning the project, run this command: 
```bash
pnpm install
```

3. Then, run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Run e2e Test (in local machine)

1. Build production with `pnpm build`, then run the production build using `pnpm start`.
2. Open another terminal (or new terminal tab, don't cancel / close the production server), then run the test with `pnpm test:e2e`.

References:

- https://nextjs.org/docs/testing#playwright
  - https://nextjs.org/docs/testing#running-your-playwright-tests
