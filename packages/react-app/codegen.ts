import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import type { CodegenConfig } from '@graphql-codegen/cli'

const require = createRequire(import.meta.url)
const schemaPath = require.resolve('graphql-api/schema.graphql')
const schema = readFileSync(schemaPath, 'utf-8')

const config: CodegenConfig = {
  schema,
  documents: ['src/**/*.graphql'],
  ignoreNoDocuments: true,
  generates: {
    'src/graphql/generated/': {
      preset: 'client-preset',
    },
  },
}

export default config
