# Eastgate — System Documentation

**Status:** Living document — update as decisions are locked or revised.
**Last updated:** 2026-08-09
**Owner:** Richard Kisivii

---

## 1. Purpose

This document is the source of truth for the Eastgate system: what it's built with, how it's structured, and what's left to build. It exists so that:

- Technology decisions are locked and not re-litigated per feature
- New work is tracked against a clear phase/roadmap instead of ad-hoc
- Anyone (including future-you) can onboard to the codebase from this file alone

---

## 2. System Overview

Eastgate is a Turborepo monorepo with three deployable applications sharing a common set of internal packages:

| App           | Framework                 | Purpose                         |
| ------------- | ------------------------- | ------------------------------- |
| `apps/client` | TanStack Start            | End-user facing application     |
| `apps/admin`  | TanStack Start            | Internal admin dashboard        |
| `apps/server` | NestJS + GraphQL (Apollo) | API layer, auth, business logic |

**Data layer:** PostgreSQL, accessed via Prisma ORM from the server only. No frontend talks to Postgres directly — everything goes through the GraphQL API.

**Auth:** Firebase Authentication (client SDK on `client`/`admin`, Firebase Admin SDK on `server`). The server verifies Firebase ID tokens and layers role-based authorization on top.

### 2.1 Architecture diagram (textual)

```
┌────────────┐     ┌────────────┐
│   client   │     │   admin    │      (TanStack Start apps)
│ (Firebase  │     │ (Firebase  │
│  client)   │     │  client)   │
└─────┬──────┘     └─────┬──────┘
      │  GraphQL over HTTP (Apollo Client)
      └──────────┬────────┘
                  ▼
         ┌─────────────────┐
         │  apps/server      │
         │  NestJS + Apollo  │
         │  - FirebaseAuthGuard (verifies ID token)
         │  - RequireRoles guard (authorization)
         │  - Resolvers / Services
         └────────┬──────────┘
                   │ Prisma Client
                   ▼
          ┌─────────────────┐
          │   PostgreSQL      │
          │ (1:1 extension    │
          │  tables per role) │
          └───────────────────┘
```

### 2.2 Monorepo layout

```
eastgate/
├── apps/
│   ├── server/
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   ├── service/
│   │   │   │   ├── service.module.ts
│   │   │   │   ├── auth/
│   │   │   │   │   ├── auth.module.ts
│   │   │   │   │   ├── auth.resolver.ts
│   │   │   │   │   └── auth.service.ts
│   │   │   │   ├── ministry/
│   │   │   │   │   ├── ministry.module.ts
│   │   │   │   │   ├── ministry.resolver.ts
│   │   │   │   │   └── ministry.service.ts
│   │   │   │   ├── sermon/
│   │   │   │   │   ├── sermon.module.ts
│   │   │   │   │   ├── sermon.resolver.ts
│   │   │   │   │   └── sermon.service.ts
│   │   │   │   ├── users/
│   │   │   │   │   ├── users.module.ts
│   │   │   │   │   ├── users.resolver.ts
│   │   │   │   │   └── users.service.ts
│   │   │   │   ├── prayer/
│   │   │   │   │   ├── prayer.module.ts
│   │   │   │   │   ├── prayer.resolver.ts
│   │   │   │   │   └── prayer.service.ts
│   │   │   │   ├── content/
│   │   │   │   │   ├── content.module.ts
│   │   │   │   │   ├── content.resolver.ts
│   │   │   │   │   └── content.service.ts
│   │   │   │   ├── events/
│   │   │   │   │   ├── events.module.ts
│   │   │   │   │   ├── events.resolver.ts
│   │   │   │   │   └── events.service.ts
│   │   │   │   ├── commerce/
│   │   │   │   │   ├── commerce.module.ts
│   │   │   │   │   ├── commerce.resolver.ts
│   │   │   │   │   └── commerce.service.ts
│   │   │   │   ├── giving/
│   │   │   │   │   ├── giving.module.ts
│   │   │   │   │   ├── giving.resolver.ts
│   │   │   │   │   └── giving.service.ts
│   │   │   │   ├── payments/
│   │   │   │   │   ├── payments.module.ts
│   │   │   │   │   ├── payments.resolver.ts
│   │   │   │   │   └── payments.service.ts
│   │   │   │   └── communications/
│   │   │   │       ├── communications.module.ts
│   │   │   │       ├── communications.resolver.ts
│   │   │   │       └── communications.service.ts
│   │   │   └── common/
│   │   │       ├── common.module.ts
│   │   │       ├── prisma/
│   │   │       ├── entity/
│   │   │       ├── dto/
│   │   │       ├── graphql/
│   │   │       ├── guards/
│   │   │       └── decorators/
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   ├── test/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── eslint.config.js
│   │   ├── nest-cli.json
│   │   ├── .env
│   │   ├── .gitignore
│   │   └── README.md
│   ├── admin/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── graphql/
│   │   │   ├── components/
│   │   │   └── config/
│   │   ├── public/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── eslint.config.js
│   │   ├── vite.config.ts
│   │   ├── .env
│   │   ├── .gitignore
│   │   └── README.md
│   └── client/
│       ├── src/
│       │   ├── app/
│       │   ├── graphql/
│       │   ├── components/
│       │   └── config/
│       ├── public/
│       ├── package.json
│       ├── tsconfig.json
│       ├── eslint.config.js
│       ├── vite.config.ts
│       ├── .env
│       ├── .gitignore
│       └── README.md
├── packages/
│   ├── ui/
│   │   ├── src/
│   │   ├── components.json
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── eslint.config.js
│   │   └── README.md
│   ├── auth/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── eslint.config.js
│   │   └── README.md
│   ├── graphql/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── eslint.config.js
│   │   └── README.md
│   ├── config/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── eslint.config.js
│   │   └── README.md
│   └── env/
│       ├── package.json
│       ├── tsconfig.json
│       ├── eslint.config.js
│       └── README.md
├── .github/
│   └── workflows/
│       └── ci.yaml
├── .vscode/
│   └── settings.json
├── .data/
├── .turbo/
├── .gitignore
├── .env
├── .prettierrc
├── docker-compose.yml
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
├── README.md
└── ARCHITECTURE.md
```

Notes (kept out of the tree itself for readability):

- Full status per domain (built / partially built / to build) is tracked in **Track B — New / Pending Decisions** (§5), not duplicated here.
- `apps/server/prisma/` holds `schema.prisma` + migrations (Prisma CLI convention); `src/common/prisma/` holds the `PrismaService` module wrapper consumed by domain services — two different things, same name.
- `docker-compose.yml` lives at the workspace root and bootstraps local Postgres only.
- Every app, every package, and the workspace root gets its own `README.md` documenting that unit's internal layout — not duplicated system-wide architecture (that stays in this file).
- `.data/` (Postgres volume from `docker-compose.yml`) and `.turbo/` (Turborepo cache) are autogenerated, never created by hand — both belong in `.gitignore`, not committed.
- **`.env` scope — recommendation, not yet locked:** per-app `.env` files (`apps/server/.env`, `apps/admin/.env`, `apps/client/.env`), not one shared root `.env`. This matches the per-app Zod env factories already in place (`admin.env.ts`, `client.env.ts`) and keeps server secrets (`DATABASE_URL`, Firebase Admin key) out of any file a frontend build process touches. The root-level `.env` above is scoped narrowly to `docker-compose.yml`'s own variables (Postgres user/password/db for local bootstrap) — not app runtime config. Confirm this matches your intent; if you'd rather consolidate, that's a real option too, just with the tradeoff of one file to keep straight across three apps' worth of variables.
- Each app's own `.gitignore` covers its build output (`apps/server/dist/`, `apps/admin/.output/`, `apps/client/.output/`, generated codegen files) — the root `.gitignore` covers workspace-wide patterns (`node_modules/`, `.turbo/`, `.data/`). Both exist; they're not redundant.
- `packages/ui/components.json` is the shadcn CLI config (aliases, style, Tailwind paths) — needed once at the package level so `shadcn add` resolves correctly against the shared library instead of per-app.

No `packages/types` — codegen covers frontend type-sharing; no `packages/db` — Prisma stays nested in `apps/server` (see §2.3).

### 2.3 Key architectural decisions (locked)

| Decision                   | Choice                                                                                                                                                                                                                                                                               | Rationale                                                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Monorepo tool              | Turborepo + pnpm workspaces                                                                                                                                                                                                                                                          | Caching, task orchestration, strict dependency resolution                                                                                |
| Frontend framework         | TanStack Start (both apps)                                                                                                                                                                                                                                                           | Consistency across client/admin, shared patterns                                                                                         |
| API style                  | GraphQL (code-first, Apollo + NestJS driver)                                                                                                                                                                                                                                         | Single schema, typed end-to-end via codegen                                                                                              |
| ORM                        | Prisma                                                                                                                                                                                                                                                                               | Type-safe queries, migration tooling                                                                                                     |
| Auth                       | Firebase Auth (client) + Firebase Admin (server verification)                                                                                                                                                                                                                        | Already adopted; `FirebaseAuthGuard` + `RequireRoles` guard pattern                                                                      |
| User modeling              | 1-to-1 extension tables per role                                                                                                                                                                                                                                                     | Keeps core `User` table lean, role-specific fields isolated                                                                              |
| UI library                 | shadcn/ui, shared via `packages/ui`                                                                                                                                                                                                                                                  | Consistent design system across both frontends                                                                                           |
| Forms                      | react-hook-form + `@hookform/resolvers/zod`                                                                                                                                                                                                                                          | Preferred integration with shadcn form components                                                                                        |
| Env validation             | Zod-based factory pattern                                                                                                                                                                                                                                                            | Fail-fast on missing/invalid env vars                                                                                                    |
| Codegen                    | `typescript-operations` + `typed-document-node` (near-operation-file), native `useQuery`/`useMutation`                                                                                                                                                                               | `typescript-react-apollo`'s generated hooks are incompatible with Apollo Client 4 — confirmed via Apollo's official docs                 |
| Lint/format                | Shared ESLint flat config + Prettier via `packages/config`                                                                                                                                                                                                                           | One config, consumed everywhere                                                                                                          |
| Frontend split             | Two apps (`client`, `admin`), not merged                                                                                                                                                                                                                                             | Preserves origin isolation for admin; two themes solved via CSS variables (`data-theme` + shadcn) in `packages/ui`, not app duplication  |
| Apollo cache               | Independent `ApolloClient`/`InMemoryCache` per app                                                                                                                                                                                                                                   | Correct for two privilege levels; shared `typePolicies` only, not runtime cache                                                          |
| GraphQL authorization      | Single schema; field-level guards or admin-only wrapper queries, never duplicated base queries                                                                                                                                                                                       | Avoids resolver/type drift between admin and client                                                                                      |
| GraphQL error handling     | Server: one exception filter → small `extensions.code` vocabulary. Client: one shared Apollo Client factory (`packages/graphql`) with per-app `onGlobalError` for routing; form errors read via `onError`/result, not `try/catch` (`errorPolicy: "all"` resolves rather than throws) | Consistent error surface across both apps, single place to add new error mappings                                                        |
| Prisma location            | Nested in `apps/server`, not `packages/db`                                                                                                                                                                                                                                           | No second consumer of Prisma types yet — codegen covers frontend type-sharing; revisit only if a worker/CLI needs direct DB access later |
| Server module organization | Domain-based (`service/<domain>/{module,resolver,service}.ts`), global `common` module for Prisma/entities/DTOs/guards                                                                                                                                                               | Matches existing convention; new features follow the same 3-file pattern                                                                 |
| DTO validation             | `class-validator` + `class-transformer`, `@InputType()`/`@ObjectType()` from `@nestjs/graphql`                                                                                                                                                                                       | Existing convention; Zod is scoped to env validation only, not DTOs                                                                      |
| Frontend routing           | Feature-folder grouped routes under `app/<domain>/` (TanStack Start routing entry)                                                                                                                                                                                                   | Mirrors server's domain-based structure for a consistent mental model                                                                    |

---

## 3. Full Stack & Package Inventory

### 3.1 Monorepo tooling

- **Turborepo** — task orchestration, caching
- **pnpm** — package manager / workspaces
- **ESLint** (flat config) + `typescript-eslint`
- **Prettier**
- **TypeScript** (shared `tsconfig.base.json`)

### 3.2 Frontend (`client`, `admin`)

- **TanStack Start** — framework
- **TanStack Router / Query** (as used by Start)
- **shadcn/ui** — component primitives
- **Tailwind CSS** — styling (shadcn dependency)
- **react-hook-form** + **@hookform/resolvers/zod**
- **Apollo Client** — GraphQL client; typed documents via `typed-document-node` codegen, consumed with native `useQuery`/`useMutation` (not generated hooks)
- **Firebase JS SDK** — client-side auth

**GraphQL codegen packages:** `@graphql-codegen/typescript`, `@graphql-codegen/typescript-operations`, `@graphql-codegen/typed-document-node`, `@graphql-codegen/near-operation-file-preset`. **Removed:** `@graphql-codegen/typescript-react-apollo` (incompatible with Apollo Client 4).

### 3.3 Backend (`server`)

- **NestJS** — application framework
- **@nestjs/graphql** + **Apollo Server** — GraphQL layer (code-first)
- **Prisma** — ORM
- **Firebase Admin SDK** — token verification
- **class-validator** + **class-transformer** — DTO validation, paired with `@nestjs/graphql` `@InputType()`/`@ObjectType()` decorators
- **Zod** — env validation only (via `packages/env` factory), not used for DTOs

### 3.4 Database

- **PostgreSQL**
- **Prisma Migrate** — schema migrations

### 3.5 Testing (planned/to confirm)

- **Vitest** — unit tests across workspace
- **Playwright** — e2e for client/admin

### 3.6 Infrastructure & Ops

- **DigitalOcean App Platform** (or Droplet — _decision pending, see §6_)
- **DigitalOcean Managed PostgreSQL**
- **DigitalOcean Spaces** — object storage (if/when file uploads are needed)
- **Sentry** — error monitoring, all three apps
- **GitHub Actions** — CI/CD

> **Action item:** fill in the "confirm" rows above and delete this note once every package choice is finalized.

---

## 4. Environments

| Environment | Purpose                     | DB                                        | Notes                                          |
| ----------- | --------------------------- | ----------------------------------------- | ---------------------------------------------- |
| Local dev   | Day-to-day development      | Local/Docker Postgres                     | `turbo dev` runs all apps                      |
| Staging     | Pre-production verification | Separate DO Managed Postgres instance     | Separate app spec/env vars from prod           |
| Production  | Live                        | DO Managed Postgres (HA if budget allows) | Deploys from `main`/tags, manual approval gate |

---

## 5. Feature / Task Roadmap

Use this section as the living task tracker. Suggested format per item: `[ ] Task — notes`. Move items to "Done" as completed; add new rows as scope becomes clearer.

Two tracks, since some "foundation" work is already built and what's left is mostly refactor-driven by decisions made in this conversation, not from-scratch scaffolding:

### Track A — Refactor (existing code, needs to change)

**GraphQL codegen & Apollo Client**

- [ ] Remove `@graphql-codegen/typescript-react-apollo` from `codegen.ts` (incompatible with Apollo Client 4)
- [ ] Add `typescript-operations` + `typed-document-node`, re-run codegen
- [ ] Update existing components calling generated hooks (e.g. `useAuthenticateAdminMutation`) to instead call native `useQuery`/`useMutation` from `@apollo/client/react` against the generated `*Document` exports
- [ ] Extract `createEastgateApolloClient` factory into `packages/graphql`, with `onGlobalError` param
- [ ] Refactor `apps/admin/src/config/apollo-client.ts` and `apps/client/.../apollo-client.ts` to call the shared factory instead of duplicating link setup

**Server error handling**

- [ ] Build `GraphQLExceptionFilter` in `apps/server/src/common/graphql/` — map Prisma errors (`P2002`, `P2025`, etc.), `UnauthorizedException`, `ForbiddenException`, `BadRequestException` to `extensions.code`
- [ ] Register filter globally via `APP_FILTER`
- [ ] Audit existing resolvers (`auth`, `ministry`, `sermon`) — confirm thrown exceptions map cleanly to the new filter, adjust any custom exceptions that don't

**Frontend error UX**

- [ ] Mount `<Toaster />` once in each app's `__root.tsx`
- [ ] Fix `AuthenticateAdmin` login form: replace `try/catch` around the mutation call with `onError`/result `error` (current `errorPolicy: "all"` resolves rather than throws)
- [ ] Apply the same local-vs-global error pattern to any other existing mutation forms

### Track B — New / Pending Decisions

**Theming** _(already locked in §2.3 — this is scaffolding work, not a decision)_

- [ ] Scaffold `packages/ui`, migrate shared shadcn components in
- [ ] Define `client` and `admin` CSS variable sets (colors, spacing tokens) — each app applies its own set statically, no runtime switching needed since they're separate apps

**Feature domains** _(confirmed from `schema.prisma`)_

| Domain           | Models                                                                                                                   | Status                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `auth`           | — (Firebase-backed)                                                                                                      | Built                                                                                                            |
| `ministry`       | `Ministry` _(built)_ + `Department`, `MinistryMember`, `DepartmentMember` _(extend)_                                     | Partially built                                                                                                  |
| `sermon`         | `Sermon`, `SermonSeries`                                                                                                 | Built                                                                                                            |
| `users`          | `User`, `Profile`, `StaffProfile`, `DeaconProfile`, `MembershipProgress`                                                 | To build                                                                                                         |
| `prayer`         | `PrayerRequest`                                                                                                          | To build                                                                                                         |
| `content`        | `CommunityPost`, `DailyVerse`, `Announcement`                                                                            | To build                                                                                                         |
| `events`         | `Event`, `ExternalPartner`, `EventRegistration`, `VolunteerSignUp`                                                       | To build                                                                                                         |
| `commerce`       | `Category`, `Product`, `ProductVariant`, `Order`, `OrderItem`                                                            | To build                                                                                                         |
| `giving`         | `DonationCampaign`, `Donation`, `MaterialDonationCampaign`, `MaterialDonationCampaignItem`, `MaterialDonation`, `Pledge` | To build                                                                                                         |
| `payments`       | `PaymentTransaction`                                                                                                     | To build — standalone module; referenced by `commerce`, `giving`, and `events`, not nested under any one of them |
| `communications` | `EmailSubscriber`, `NotificationLog`                                                                                     | To build                                                                                                         |

Known schema issues to fix before/while building the affected domains:

- [ ] `OrderItem.quantity` is typed `String` — should be `Int` (inconsistent with `MaterialDonationCampaignItem.targetQuantity`, `Pledge.pledgedItemQty`)
- [ ] `CreateMinistryInput.headId` DTO is `@IsInt() number` but `Ministry.headId` in schema is `String?` (UUID, references `User.id`) — DTO is wrong, fix to `@IsUUID() string`

- [ ] Per confirmed domain: DTO + entity + resolver + service (server), operations + routes (admin — full CRUD; client — read + user-facing actions only, see split below)

**Phase 2/3 scope split — admin (full CRUD) vs client (read + user actions)**

| Domain           | Admin                                 | Client                                                        |
| ---------------- | ------------------------------------- | ------------------------------------------------------------- |
| `users`          | Full CRUD, role management            | Own profile view/edit only                                    |
| `ministry`       | Full CRUD                             | Browse ministries/departments, join                           |
| `prayer`         | View/resolve requests                 | Submit request                                                |
| `content`        | Full CRUD                             | Read (feed, daily verse, announcements)                       |
| `sermon`         | Full CRUD                             | Browse/watch                                                  |
| `events`         | Full CRUD                             | Browse, register, sign up to volunteer                        |
| `commerce`       | Full CRUD, inventory                  | Browse, checkout                                              |
| `giving`         | Campaign CRUD, view pledges/donations | Donate, pledge                                                |
| `payments`       | View transaction log                  | Triggered by checkout/donate/register flows (M-Pesa STK push) |
| `communications` | Send announcements/notifications      | Subscribe (email)                                             |

**Workspace tooling**

- [ ] Finalize `turbo.json` pipeline caching (`inputs`/`outputs` per task, `dependsOn` chains)
- [ ] Confirm `packages/config` (ESLint flat config, tsconfig base, Prettier) is wired into all apps — or still per-app
- [ ] Confirm `packages/env` Zod factory is adopted workspace-wide
- [ ] Add `README.md` to each app (`server`, `admin`, `client`), each package (`ui`, `auth`, `graphql`, `config`, `env`), and the workspace root — each documents that unit's own layout, not system-wide architecture

**Hardening**

- [ ] Vitest unit test coverage across `apps/server` and packages
- [ ] Playwright e2e for critical flows (login, core CRUD per domain)
- [ ] Sentry wired into all three apps
- [ ] Health check endpoint (`/health` on server) + DO uptime checks

**Deployment** _(blocked on open decisions in §6)_

- [ ] `DATABASE_URL` (pooled) / `DIRECT_URL` (direct) env vars added to Zod schema
- [ ] `pre_deploy_run_command: prisma migrate deploy` wired into DO app spec (or CI step, if Droplet)
- [ ] GitHub Actions CI: lint → typecheck → test → migration drift check → build
- [ ] Staging app deployed, connected to staging Postgres
- [ ] Production app deployed, HA Postgres decision made
- [ ] DNS, TLS, domain cutover

### Done

- [x] Turborepo workspace scaffolded with `client`, `admin`, `server`
- [x] `@eastgate/auth` package created
- [x] 1-to-1 extension table pattern adopted
- [x] `FirebaseAuthGuard` + `RequireRoles` implemented (server)
- [x] Domain-based server structure (`service/<domain>/{module,resolver,service}`, global `common` module)
- [x] `auth`, `ministry`, `sermon` domain modules built
- [x] DTOs (class-validator) + entities (`@nestjs/graphql`) established
- [x] Apollo Codegen initially set up (now superseded by Track A fixes above)

---

## 6. Open Decisions

| Question                              | Options                             | Status                                                |
| ------------------------------------- | ----------------------------------- | ----------------------------------------------------- |
| DO hosting model                      | App Platform vs Droplet             | Pending — leaning App Platform for lower ops overhead |
| HA Postgres in prod                   | Single-node ($15/mo) vs HA ($60/mo) | Pending — budget-dependent                            |
| File/object storage                   | DO Spaces — needed yet?             | Pending — no upload feature confirmed yet             |
| Client-side state beyond Apollo cache | Zustand/Jotai vs plain React state  | Assumed: none needed yet — confirm if wrong           |

---

## 7. Timeline Estimate

Estimated as **effort-based phases**, not fixed calendar dates — adjust based on actual hours/week available. Assumes solo, part-time pace.

| Phase                                 | Scope                                                                       | Estimated effort |
| ------------------------------------- | --------------------------------------------------------------------------- | ---------------- |
| Phase 0 — Foundation                  | Workspace/tooling lock-in                                                   | 1–2 weeks        |
| Phase 1 — Auth & Core API             | Auth consolidation, error handling, codegen fix (Track A)                   | 1–2 weeks        |
| `users`, `ministry` (extend)          | Core identity + org structure — most other domains depend on these          | 4–6 days         |
| `prayer`, `content`, `communications` | Small models, low relational complexity                                     | 3–5 days         |
| `sermon`                              | Already built                                                               | —                |
| `events`                              | Registration + volunteer sign-up flows                                      | 3–4 days         |
| `commerce`                            | Product/variant/inventory + order flow                                      | 4–6 days         |
| `giving`                              | Campaigns, donations, pledges — largest model count                         | 4–6 days         |
| `payments`                            | M-Pesa STK push integration — external gateway adds risk beyond model count | 3–5 days         |
| Phase 4 — Hardening                   | Tests, Sentry, health checks                                                | 1–2 weeks        |
| Phase 5 — Deployment                  | CI/CD, staging/prod cutover                                                 | 3–5 days         |

**Rollup:** Phase 2/3 domain work ≈ 3–4.5 weeks combined (admin + client), on top of ~2–4 weeks for Phases 0/1 and ~1.5–2.5 weeks for Phases 4/5 — **roughly 7–11 weeks total** at part-time solo pace. Treat this as a rough envelope, not a commitment — `payments` (external gateway) and `commerce` (most relational complexity) are the likeliest to run over.

---

## 8. Conventions

- **Git**: `.vscode` directory ignored; recommended extensions tracked via `.vscode/extensions.json`
- **Env vars**: validated at boot via Zod factory — app should fail fast on missing/invalid config, not at first use
- **Forms**: react-hook-form + Zod resolver, paired with shadcn form primitives
- **GraphQL operations**: colocated `.graphql` files in `packages/graphql`, codegen produces typed hooks — no ad-hoc `gql` tags in app code
