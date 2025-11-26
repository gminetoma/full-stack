import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files'
import type { CodegenConfig } from '@graphql-codegen/cli'

/** @see https://github.com/eddeee888/graphql-code-generator-plugins/tree/master/packages/typescript-resolver-files */
const schemasConfig = defineConfig({
  resolverTypesPath: 'types.ts',
  resolverMainFile: 'resolvers.ts',
  typeDefsFilePath: 'typeDefs.ts',
  mergeSchema: 'schema.graphqls',
  typesPluginsConfig: { useTypeImports: true },
})

const config: CodegenConfig = {
  schema: '**/schema.graphql',
  generates: {
    'src/graphql/generated/': { ...schemasConfig },
    'tests/utils/graphql/generated/': {
      preset: 'client-preset',
      config: {
        documentMode: 'string',
      },
      documents: ['**/*.graphql'],
    },
  },
}
export default config
