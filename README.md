# Eastgate Monorepo ![CI](https://github.com/astradevmagic-cell/eastgate/actions/workflows/ci.yml/badge.svg)

A high-performance, full-stack monorepo powered by **Turborepo**, **pnpm**, and **TypeScript 6**. This project uses a unified architectural pattern to share configurations and UI components across a modern web and server stack.

## 🏗 Project Structure

### Apps
- `apps/web`: **TanStack Start** application (Vite-based React framework) with 100% type-safe routing.
- `apps/server`: **NestJS** backend providing a GraphQL API via Apollo Server 5.
- `apps/docs`: **Next.js** documentation site.

### Shared Packages
- `@eastgate/ui`: Shared React component library.
- `@eastgate/eslint-config`: Centralized ESLint rules (specialized for NestJS, TanStack, and Next.js).
- `@eastgate/typescript-config`: Shared `tsconfig.json` bases for strict type-checking across different runtimes.

## 🛠 Tech Stack
- **Orchestration:** [Turborepo](https://turbo.build/)
- **Package Manager:** [pnpm](https://pnpm.io/) (v10+)
- **Frontend:** [TanStack Start](https://tanstack.com/start), React 19, Vite
- **Backend:** [NestJS](https://nestjs.com/), GraphQL, Apollo Server 5
- **Language:** [TypeScript 6.0+](https://www.typescriptlang.org/)
- **Linting & Formatting:** ESLint 10, Prettier 3.8

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `^24` or higher.
- **pnpm**: `^10.33.2` or higher.

### Installation
From the root directory:
```sh
pnpm install
pnpm approve-builds  # Whitelists essential build scripts for sharp/esbuild
```

### Development
Start all applications in development mode:
```sh
pnpm dev
```

To develop a specific app (e.g., just the server):
```sh
pnpm dev --filter=@eastgate/server
```

### Build & Type-Check
From the root directory:
```sh
pnpm build          # Builds all apps and packages
pnpm check-types    # Runs sychronized type-checking across the workspace
```

## 🧹 Maintenance Commands
- **Format Code:** 
```sh 
pnpm format
```
- **Lint Everything:** 
```sh
pnpm lint
```
- **Clean Workspace:** 
```sh
pnpm clean  # (Removes all node_modules, dist, and build caches)
```

## 📖 Key Architectural Decisions
- **ESM-First:** The server and web apps are configured for modern ESM resolution using [NodeNext].
- **Type-Safe Routing:** The web app uses TanStack Router's code generation for zero-runtime-error navigation.
- **Unified Configs:** ESLint and TypeScript rules are managed in the [packages/] directory to ensure consistency between the backend and frontend.

# Built with ❤️ by Richard kisivii.