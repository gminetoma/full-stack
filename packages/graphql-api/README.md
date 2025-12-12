# GraphQL API

A modern GraphQL API server built with Bun, Hono, and GraphQL Yoga featuring real-time subscriptions via WebSockets.

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh) >= 1.0.0

### Installation

From the monorepo root:

```bash
bun install
```

### Development

```bash
bun api dev
```

The server will start with hot reload enabled at `http://localhost:8080`.

## 📡 API Endpoints

- **GraphQL Endpoint**: `http://localhost:8080/graphql`
- **GraphQL Playground**: `http://localhost:8080/graphql` (GraphiQL interface)
- **WebSocket Subscriptions**: `ws://localhost:8080/ws`
- **Health Check**: `http://localhost:8080/health-check`

## 🏗️ Architecture

### Tech Stack

- **Runtime**: [Bun](https://bun.sh) - Fast JavaScript runtime with native TypeScript support
- **Web Framework**: [Hono](https://hono.dev) - Ultra-fast web framework
- **GraphQL Server**: [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server) - Flexible GraphQL server
- **Subscriptions**: [graphql-ws](https://github.com/enisdenjo/graphql-ws) - WebSocket protocol for GraphQL
- **Code Generation**: [@eddeee888/gcg-typescript-resolver-files](https://github.com/eddeee888/graphql-code-generator-plugins) - Type-safe resolver generation
- **Configuration**: [Convict](https://github.com/mozilla/node-convict) - Schema-based configuration
- **Testing**: Bun Test with coverage support

### Project Structure

```
graphql-api/
├── config/                  # Configuration management
│   ├── constants.ts        # Environment constants
│   └── index.ts           # Convict configuration schema
│
├── src/
│   ├── entry/
│   │   └── index.ts       # Server entry point and setup
│   │
│   ├── graphql/
│   │   ├── base/          # Base GraphQL schema
│   │   │   └── schema.graphql
│   │   │
│   │   ├── time/          # Time module (example subscription)
│   │   │   ├── schema.graphql
│   │   │   └── resolvers/
│   │   │
│   │   ├── user/          # User module (example queries/mutations)
│   │   │   ├── schema.graphql
│   │   │   └── resolvers/
│   │   │
│   │   └── generated/     # Auto-generated files (do not edit)
│   │       ├── resolvers.ts
│   │       ├── typeDefs.ts
│   │       ├── types.ts
│   │       └── schema.graphqls
│   │
│   └── utils/             # Shared utilities
│
└── tests/                 # Test files
    ├── server.test.ts
    └── utils/
```

## 📝 GraphQL Schema

The API uses a modular schema approach with schema-first design:

### Example Schema Modules

**Time Module** (`src/graphql/time/schema.graphql`):
```graphql
extend type Subscription {
  time: String!
}
```

**User Module** (`src/graphql/user/schema.graphql`):
```graphql
type User {
  id: ID!
}

extend type Query {
  users: [User!]!
}

extend type Mutation {
  createUser(id: ID!): CreateUserResult!
}

type CreateUserOk {
  result: User!
}

type CreateUserError {
  error: String!
}

union CreateUserResult = CreateUserOk | CreateUserError
```

### Adding New Schema Modules

1. Create a new directory under `src/graphql/`:
   ```bash
   mkdir src/graphql/your-module
   ```

2. Add your schema file:
   ```bash
   touch src/graphql/your-module/schema.graphql
   ```

3. Create a resolvers directory:
   ```bash
   mkdir src/graphql/your-module/resolvers
   ```

4. Run code generation:
   ```bash
   bun api codegen
   ```

5. Implement your resolvers in the generated files under `src/graphql/your-module/resolvers/`

## 🔄 Code Generation

The project uses GraphQL Code Generator to automatically create type-safe resolvers:

```bash
bun api codegen
```

This command:
- Scans all `**/schema.graphql` files
- Generates TypeScript types and resolver scaffolding
- Creates a merged schema file at `src/graphql/generated/schema.graphqls`
- Generates resolver files with proper typing

### Configuration

Code generation is configured in `codegen.ts`:

```typescript
const schemasConfig = defineConfig({
  resolverTypesPath: 'types.ts',
  resolverMainFile: 'resolvers.ts',
  typeDefsFilePath: 'typeDefs.ts',
  mergeSchema: 'schema.graphqls',
  typesPluginsConfig: { useTypeImports: true },
})
```

## ⚙️ Configuration

Configuration is managed via environment variables using Convict for validation and type safety.

### Environment Variables

Create a `.env` file in the `packages/graphql-api` directory:

```env
NODE_ENV=development
PORT=8080
HOST_NAME=localhost
PROTOCOL=http
GRAPHQL_ENDPOINT=/graphql
GRAPHIQL_ENDPOINT=/ws
```

### Available Configuration Options

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `NODE_ENV` | `production` \| `development` | `development` | Environment mode |
| `PORT` | number | `8080` | Server port |
| `HOST_NAME` | string | `localhost` | Server hostname |
| `PROTOCOL` | string | `http` | Protocol (http/https) |
| `GRAPHQL_ENDPOINT` | string | `/graphql` | GraphQL endpoint path |
| `GRAPHIQL_ENDPOINT` | string | `/ws` | WebSocket endpoint path |

## 🧪 Testing

### Run Tests

```bash
bun api test
```

### Run Tests with Coverage

```bash
bun api coverage
```

### Writing Tests

Tests are written using Bun's built-in test runner:

```typescript
import { describe, expect, test } from 'bun:test'

describe('GraphQL Server', () => {
  test('health check returns 200', async () => {
    const response = await fetch('http://localhost:8080/health-check')
    expect(response.status).toBe(200)
  })
})
```

## 🔌 WebSocket Subscriptions

The API supports real-time subscriptions using the graphql-ws protocol:

### Client Example

```typescript
import { createClient } from 'graphql-ws'

const client = createClient({
  url: 'ws://localhost:8080/ws',
})

client.subscribe(
  {
    query: 'subscription { time }',
  },
  {
    next: (data) => console.log('Received:', data),
    error: (error) => console.error('Error:', error),
    complete: () => console.log('Complete'),
  }
)
```

## 🛠️ Development

### Hot Reload

The development server uses Bun's `--hot` flag for instant hot reload:

```bash
bun api dev
```

Any changes to TypeScript files will automatically reload the server.

### Linting

```bash
bun api lint
```

The project uses [Biome](https://biomejs.dev) for fast linting and formatting.

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `bun api dev` | Start development server with hot reload |
| `bun api codegen` | Generate GraphQL types and resolvers |
| `bun api test` | Run tests |
| `bun api coverage` | Run tests with coverage report |
| `bun api lint` | Lint code with Biome |
| `bun api bun` | Direct access to Bun runtime |

## 🔗 Related Packages

This API is consumed by the `react-app` package in the monorepo. The GraphQL schema is automatically shared via the package exports:

```json
{
  "exports": {
    "./schema.graphql": "./src/graphql/generated/schema.graphql"
  }
}
```

## 📚 Resources

- [Bun Documentation](https://bun.sh/docs)
- [Hono Documentation](https://hono.dev)
- [GraphQL Yoga Documentation](https://the-guild.dev/graphql/yoga-server/docs)
- [graphql-ws Documentation](https://github.com/enisdenjo/graphql-ws)
- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen)