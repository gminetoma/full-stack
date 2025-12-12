# Full-Stack TypeScript Monorepo

A modern full-stack application built with TypeScript, React, and GraphQL using Bun as the runtime and package manager.

## 🏗️ Architecture

This is a monorepo containing:

- **`packages/graphql-api`** - GraphQL API server with subscriptions support
- **`packages/react-app`** - React application with SSR and internationalization
- **`packages/tools/cypress`** - End-to-end testing suite
- **`packages/tools/storybook`** - Component documentation and development

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh) >= 1.0.0

### Installation

```bash
bun install
```

### Development

Run both frontend and backend in separate terminals:

```bash
# Terminal 1 - Start the GraphQL API server
bun api dev

# Terminal 2 - Start the React app
bun app dev
```

The API will be available at `http://localhost:8080/graphql` and the React app at `http://localhost:3000`.

## 📦 Workspace Commands

The monorepo uses workspace-scoped commands for convenience:

```bash
# React App commands
bun app dev              # Start development server
bun app build            # Build for production
bun app codegen          # Generate GraphQL types
bun app lint             # Run linter
bun app test             # Run tests

# GraphQL API commands
bun api dev              # Start development server with hot reload
bun api codegen          # Generate resolvers and types
bun api lint             # Run linter
bun api test             # Run tests
bun api coverage         # Run tests with coverage

# Testing tools
bun cypress open         # Open Cypress test runner
bun cypress run          # Run Cypress tests headlessly

# Storybook
bun storybook dev        # Start Storybook dev server
bun storybook build      # Build Storybook

# Root-level commands
bun lint                 # Lint all packages
```

## 🛠️ Tech Stack

### Core Technologies
- **Runtime**: [Bun](https://bun.sh) - Fast all-in-one JavaScript runtime
- **Language**: TypeScript with strict type checking
- **Linting**: [Biome](https://biomejs.dev) - Fast formatter and linter

### Backend (`graphql-api`)
- **Web Server**: [Hono](https://hono.dev) - Lightweight web framework
- **GraphQL**: [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server) - Flexible GraphQL server
- **Subscriptions**: [graphql-ws](https://github.com/enisdenjo/graphql-ws) - WebSocket protocol for GraphQL
- **Configuration**: [Convict](https://github.com/mozilla/node-convict) - Environment configuration management

### Frontend (`react-app`)
- **Framework**: [React 19](https://react.dev) with Server-Side Rendering
- **Routing**: [TanStack Router](https://tanstack.com/router) + [TanStack Start](https://tanstack.com/start)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **Build Tool**: [Vite](https://vitejs.dev) with TypeScript paths support
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com)
- **Animations**: [Motion](https://motion.dev)
- **i18n**: [i18next](https://www.i18next.com) with React integration

### Testing & Development Tools
- **Unit Testing**: [Vitest](https://vitest.dev) with coverage support
- **E2E Testing**: [Cypress](https://www.cypress.io)
- **Component Development**: [Storybook](https://storybook.js.org)

## 📝 Code Generation

Both packages use GraphQL Code Generator to maintain type safety:

```bash
# Generate types for both packages
bun api codegen && bun app codegen
```

This generates:
- **API**: TypeScript resolvers and type definitions from GraphQL schemas
- **App**: Type-safe GraphQL client hooks and operations

## 🌍 Internationalization

The React app supports multiple languages (English and Portuguese by default). Translations are located in:
- `packages/react-app/public/locales/en/`
- `packages/react-app/public/locales/pt/`

## 🎨 Styling

The project uses Tailwind CSS v4 with the shadcn/ui component system. Add new components:

```bash
bun app shadcn add <component-name>
```

## 🧪 Testing

```bash
# Unit tests
bun api test             # Backend tests
bun app test             # Frontend tests

# Coverage reports
bun api coverage
bun app coverage

# E2E tests
bun cypress open         # Interactive mode
bun cypress run          # CI mode
```

## 📂 Project Structure

```
.
├── packages/
│   ├── graphql-api/         # GraphQL backend
│   │   ├── config/          # Configuration management
│   │   ├── src/
│   │   │   ├── entry/       # Server entry point
│   │   │   ├── graphql/     # Schema and resolvers
│   │   │   └── utils/       # Shared utilities
│   │   └── tests/           # API tests
│   │
│   ├── react-app/           # React frontend
│   │   ├── config/          # App configuration
│   │   ├── public/          # Static assets and translations
│   │   ├── src/
│   │   │   ├── components/  # React components
│   │   │   ├── graphql/     # Generated GraphQL client
│   │   │   ├── layouts/     # Layout components
│   │   │   ├── pages/       # Page components
│   │   │   ├── routes/      # TanStack Router routes
│   │   │   └── lib/         # Utilities and helpers
│   │   └── tests/           # Frontend tests
│   │
│   └── tools/
│       ├── cypress/         # E2E tests
│       └── storybook/       # Component documentation
│
├── biome.json              # Biome configuration
├── graphql.config.json     # GraphQL IDE configuration
└── package.json            # Workspace configuration
```

## 🔧 Configuration

### Environment Variables

Create `.env` files in the respective packages:

**`packages/graphql-api/.env`**:
```env
NODE_ENV=development
PORT=8080
HOST_NAME=localhost
PROTOCOL=http
GRAPHQL_ENDPOINT=/graphql
GRAPHIQL_ENDPOINT=/ws
```

**`packages/react-app/.env`**:
```env
# Add your React app environment variables here
PORT=5173
PROTOCOL=http
HOST_NAME=localhost
NODE_ENV=development
```
