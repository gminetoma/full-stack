# React App

A modern React application with Server-Side Rendering, internationalization, and GraphQL integration built with TanStack Router, Vite, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh) >= 1.0.0
- GraphQL API running (see `packages/graphql-api`)

### Installation

From the monorepo root:

```bash
bun install
```

### Development

```bash
bun app dev
```

The app will start at `http://localhost:3000` with hot reload enabled.

### Build for Production

```bash
bun app build
```

## 🏗️ Architecture

### Tech Stack

- **Framework**: [React 19](https://react.dev) - Latest React with modern features
- **SSR Framework**: [TanStack Start](https://tanstack.com/start) - Full-stack React framework with SSR
- **Routing**: [TanStack Router](https://tanstack.com/router) - Type-safe routing with automatic code-splitting
- **Data Fetching**: [TanStack Query](https://tanstack.com/query) - Powerful async state management
- **Build Tool**: [Vite](https://vitejs.dev) - Next-generation frontend tooling
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) - Utility-first CSS framework
- **UI Components**: [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com) - Accessible component primitives
- **Animations**: [Motion](https://motion.dev) - Production-ready animation library
- **i18n**: [i18next](https://www.i18next.com) - Internationalization framework
- **GraphQL**: Type-safe client with code generation
- **Testing**: [Vitest](https://vitest.dev) with coverage support

### Project Structure

```
react-app/
├── config/                  # Application configuration
│   ├── constants.ts        # App constants
│   ├── paths.ts           # Path definitions
│   └── index.ts           # Config exports
│
├── public/                 # Static assets
│   ├── images/            # Image assets
│   └── locales/           # Translation files
│       ├── en/            # English translations
│       │   ├── common.json
│       │   ├── components.json
│       │   └── marketing.json
│       └── pt/            # Portuguese translations
│           ├── common.json
│           ├── components.json
│           └── marketing.json
│
├── src/
│   ├── start.ts           # TanStack Start entry point
│   ├── client.tsx         # Client entry point
│   ├── server.tsx         # Server entry point
│   ├── router.tsx         # Router configuration
│   ├── routeTree.gen.ts   # Auto-generated route tree
│   │
│   ├── components/        # React components
│   │   ├── DropdownLanguageMenu.tsx
│   │   ├── ThemeSwitcher.tsx
│   │   └── shadcn/       # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── dropdown-menu.tsx
│   │
│   ├── graphql/          # GraphQL client code
│   │   └── generated/    # Auto-generated GraphQL types
│   │
│   ├── hooks/            # Custom React hooks
│   │
│   ├── layouts/          # Layout components
│   │   ├── AppLayout/
│   │   ├── MarketingLayout/
│   │   ├── RootLayout/
│   │   └── components/
│   │
│   ├── lib/              # Utilities and libraries
│   │   ├── cn.ts         # Class name utilities
│   │   ├── getOrigin.ts
│   │   ├── exceptions/
│   │   ├── i18next/      # i18n configuration
│   │   └── theme-mode/   # Theme management
│   │
│   ├── pages/            # Page components
│   │   ├── NotFound.tsx
│   │   ├── App/
│   │   └── Marketing/
│   │
│   ├── providers/        # React context providers
│   │   ├── SharedProviders.tsx
│   │   └── ThemeModeProvider.tsx
│   │
│   ├── routes/           # TanStack Router routes
│   │   ├── __root.tsx
│   │   ├── _marketing.ts
│   │   ├── app.ts
│   │   ├── _marketing/
│   │   └── app/
│   │
│   ├── styles/           # Global styles
│   │   ├── app.css
│   │   └── components.css
│   │
│   └── types/            # TypeScript type definitions
│       └── app.d.ts
│
└── tests/                # Test files
```

## 🎨 Styling

### Tailwind CSS

The app uses Tailwind CSS v4 with the `@tailwindcss/vite` plugin for optimal performance.

### shadcn/ui Components

Add new shadcn components:

```bash
bun app shadcn add <component-name>
```

Available components: button, card, dropdown-menu, and many more from the [shadcn/ui catalog](https://ui.shadcn.com/docs/components).

### Custom Styling

Use the `cn()` utility for conditional class names:

```tsx
import { cn } from '@/lib/cn'

<div className={cn('base-classes', {
  'conditional-class': condition
})} />
```

## 🌍 Internationalization

The app supports multiple languages out of the box (English and Portuguese).

### Adding Translations

1. Add translations in `public/locales/{language}/{namespace}.json`:

```json
// public/locales/en/common.json
{
  "welcome": "Welcome",
  "goodbye": "Goodbye"
}
```

2. Use in components:

```tsx
import { useTranslation } from 'react-i18next'

function Component() {
  const { t } = useTranslation('common')
  return <h1>{t('welcome')}</h1>
}
```

### Adding New Languages

1. Create language folder: `public/locales/{language-code}/`
2. Add translation files matching existing namespaces
3. Update i18n configuration if needed

### Available Namespaces

- `common` - Common translations
- `components` - Component-specific translations
- `marketing` - Marketing page translations

## 🎭 Theme Support

The app includes built-in dark/light theme support with system preference detection.

### Theme Switcher Component

```tsx
import { ThemeSwitcher } from '@/components/ThemeSwitcher'

function Header() {
  return <ThemeSwitcher />
}
```

The theme preference is stored in cookies for SSR consistency.

## 🔌 GraphQL Integration

### Code Generation

Generate type-safe GraphQL client code:

```bash
bun app codegen
```

This reads the schema from the `graphql-api` package and generates:
- Type-safe hooks and queries
- TypeScript types matching the schema
- Fragment helpers

### Configuration

Code generation is configured in `codegen.ts`:

```typescript
const config: CodegenConfig = {
  schema, // Imported from graphql-api package
  documents: ['src/**/*.graphql'],
  generates: {
    'src/graphql/generated/': {
      preset: 'client-preset',
    },
  },
}
```

### Using GraphQL

1. Create a `.graphql` file:

```graphql
# src/queries/users.graphql
query GetUsers {
  users {
    id
  }
}
```

2. Run code generation:

```bash
bun app codegen
```

3. Use in components:

```tsx
import { useQuery } from '@tanstack/react-query'
import { graphql } from '@/graphql/generated'

const getUsersQuery = graphql(/* GraphQL */ `
  query GetUsers {
    users {
      id
    }
  }
`)

function Users() {
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      // Your GraphQL client call
    }
  })
}
```

## 🛣️ Routing

The app uses TanStack Router with file-based routing.

### Route Structure

- `__root.tsx` - Root layout wrapping all routes
- `_marketing.ts` - Marketing layout route (no auth required)
- `app.ts` - App layout route (authenticated area)
- `_marketing/` - Marketing pages
- `app/` - Application pages

### Adding New Routes

Routes are automatically discovered from the `src/routes/` directory. After adding a route file, the route tree is automatically regenerated.

Example route file:

```tsx
// src/routes/app/dashboard.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  return <div>Dashboard</div>
}
```

## 🧪 Testing

### Run Tests

```bash
bun app test
```

### Run Tests with Coverage

```bash
bun app coverage
```

### Writing Tests

Tests use Vitest and React Testing Library:

```tsx
import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/shadcn/button'

describe('Button', () => {
  test('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeDefined()
  })
})
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the `packages/react-app` directory:

```env
# Add your environment variables here
VITE_API_URL=http://localhost:8080
```

Access in code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

### Vite Configuration

The app is configured in `vite.config.ts` with:
- React plugin with automatic JSX runtime
- TypeScript path aliases
- SVG as React components
- Tailwind CSS integration

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `bun app dev` | Start development server |
| `bun app build` | Build for production |
| `bun app codegen` | Generate GraphQL types |
| `bun app test` | Run tests |
| `bun app coverage` | Run tests with coverage |
| `bun app lint` | Lint code with Biome |
| `bun app shadcn` | Add shadcn/ui components |

## 🎯 Features

### Server-Side Rendering (SSR)

All routes are rendered on the server by default for optimal SEO and performance. Configure per-route:

```tsx
export const Route = createFileRoute('/page')({
  component: Page,
  // Disable SSR for this route if needed
})
```

### Code Splitting

Routes are automatically code-split for optimal bundle sizes.

### Type Safety

- Full TypeScript coverage
- GraphQL types generated from schema
- Type-safe routing with TanStack Router
- Type-safe i18n translations

### Performance

- Vite for fast builds and HMR
- Automatic code splitting
- Optimized production builds
- Server-side rendering

## 🔗 Related Packages

This app consumes the `graphql-api` package from the monorepo:

```json
{
  "dependencies": {
    "graphql-api": "workspace:*"
  }
}
```

## 📚 Resources

- [React Documentation](https://react.dev)
- [TanStack Router](https://tanstack.com/router)
- [TanStack Start](https://tanstack.com/start)
- [TanStack Query](https://tanstack.com/query)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [i18next](https://www.i18next.com)