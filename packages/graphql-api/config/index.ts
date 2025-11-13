import path from 'node:path'
import convict from 'convict'
import dotenv from 'dotenv'

const envPath = path.resolve(import.meta.dir, '.env')
dotenv.config({ path: envPath, quiet: true })

export const NODE_ENV_PRODUCTION = 'production'
export const NODE_ENV_DEVELOPMENT = 'development'

const config = convict({
  env: {
    format: [NODE_ENV_PRODUCTION, NODE_ENV_DEVELOPMENT],
    default: NODE_ENV_DEVELOPMENT,
    env: 'NODE_ENV',
  },
  port: {
    format: 'port',
    default: 8080,
    env: 'PORT',
  },
  graphiqlEndpoint: {
    default: '/ws',
    env: 'GRAPHIQL_ENDPOINT',
  },
  graphqlEndpoint: {
    default: '/graphql',
    env: 'GRAPHQL_ENDPOINT',
  },
  hostName: {
    default: 'localhost',
    env: 'HOST_NAME',
  },
  protocol: {
    default: 'http',
    env: 'PROTOCOL',
  },
})

export default config
