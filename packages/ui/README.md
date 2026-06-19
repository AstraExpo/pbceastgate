# @eastgate/ui

Internal shared UI component library for the Eastgate Turborepo workspace. Built using React 19, Tailwind CSS, and headless Radix UI primitives configured via the Shadcn CLI architecture.

---

## Technologies & Core Stack

- **Framework & Runtime:** React 19, React DOM 19, TypeScript 6.0
- **Styling & Design Tokens:** Tailwind CSS, `tailwindcss-animate`
- **Component Primitives:** Radix UI (Headless primitives for Dialog, Select, Dropdown, Tabs, etc.)
- **Utilities:** `class-variance-authority` (CVA for variant management), `clsx`, `tailwind-merge` (for conflict-free class combination)
- **Additional Ecosystem Tools:** `recharts` (Data visualization), `embla-carousel-react` (Carousels), `react-day-picker` (Date pickers), `sonner` (Toast notifications), `vaul` (Drawers)

---

## Folder Structure

```text
packages/ui/
├── src/
│   ├── components/
│   │   └── ui/               # Atomic design system primitives generated via Shadcn
│   └── lib/
│       └── utils.ts          # Core utilities (e.g., deterministic 'cn' class merger)
├── components.json           # Shadcn CLI configuration for tracking paths and aliases
├── package.json              # Workspace configuration, entry-points, and dependencies
├── tsconfig.json             # TypeScript configuration inheriting from workspace rules
└── tailwind.config.js        # Shared component-level Tailwind configuration
└── eslint.config.js          # EsLint configuration inheriting from workspace rules
```

---

## Module Architecture & Exports

The package uses explicit subpath exports to prevent bundle bloat and ensure fast resolution across consumer applications (**client** and **admin**).

```sh
{
  "exports": {
    "./components/*": "./src/components/ui/*.tsx",
    "./lib/*": "./src/lib/*.ts",
    "./package.json": "./package.json"
  }
}
```

---

## Consumption Examples

**TypeScript**

```sh
// Importing a component primitive in client/admin apps
import { Button } from "@eastgate/ui/components/button";

// Importing workspace utilities
import { cn } from "@eastgate/ui/lib/utils";
```

---

## Available Scripts

- Enforces code style and rules via ESLint with a strict zero-warning tolerance (`--max-warnings 0`).

```sh
pnpm lint
```

- Executes the TypeScript compiler in `noEmit` mode to validate type safety.

```sh
pnpm check-types
```

- Executes custom workspace generators via Turbo to scaffold internal composite blocks.

```sh
pnpm generate:component
```
