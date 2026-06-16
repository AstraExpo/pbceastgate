# PBC Eastgate Web System ![CI](https://github.com/astradevmagic-cell/eastgate/actions/workflows/ci.yml/badge.svg)

A high-performance, full-stack monorepo powered by **Turborepo**, **pnpm**, and **TypeScript 6**. This project uses a unified architectural pattern to share configurations and UI components across a modern web and server stack.

## 🏗 Project Structure

### Apps

- `apps/client`: **TanStack Start** application (Vite-based React framework) with 100% type-safe routing.
- `apps/server`: **NestJS** backend providing a GraphQL API via Apollo Server 5.
- `apps/admin`: **TanStack Start** application (Vite-based React framework) with 100% type-safe routing.

### Shared Packages

- `@eastgate/ui`: **Shadcn/ui** Shared React component library.
- `@eastgate/shared`: **Graphql & Codegen** Shared Graphql and Codegen Config.
- `@eastgate/database`: **Prisma V7** Shared prisma config with the schema file.
- `@eastgate/eslint-config`: **Eslint Config** Centralized ESLint rules (specialized for NestJS, TanStack, Base config, and React Library).
- `@eastgate/typescript-config`: **Typescript Config** Shared `tsconfig.json` bases for strict type-checking across different runtimes.

## 🛠 Tech Stack

- **Orchestration:** [Turborepo](https://turbo.build/)
- **Package Manager:** [pnpm](https://pnpm.io/) (v11+)
- **Frontend:** [TanStack Start](https://tanstack.com/start), React 19, Vite
- **Backend:** [NestJS](https://nestjs.com/), GraphQL, Apollo Server 5
- **Language:** [TypeScript 6.0+](https://www.typescriptlang.org/)
- **Linting & Formatting:** ESLint 10, Prettier 3.8

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `^24` or higher.
- **pnpm**: `^11.5.3` or higher.
- **Docker**: `^29.5.3` or higher.

### Installation

From the root directory:

```sh
pnpm install
pnpm approve-builds  # Whitelists all build scripts for sharp/esbuild
```

### Development

Start all applications in development mode:

```sh
pnpm dev
```

Start all applications and postgresql database container in development mode:

```sh
pnpm ignite
```

To develop a specific app (e.g., just the server):

```sh
pnpm dev --filter=@eastgate/server
```

### Database

Run database migrations:

```sh
pnpm db:migrate
```

Generate Prisma Client:

```sh
pnpm db:generate
```

Start Prisma Studio Client:

```sh
pnpm db:studio
```

### Codegen

Generate Graphql types and Apollo Client hooks:

```sh
pnpm codegen
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

# Built by Richard Kisivii.
