import convict from 'convict'
import dotenv from 'dotenv'
import { NODE_ENV_DEVELOPMENT, NODE_ENV_PRODUCTION } from './constants'
import { ENV_FILE_PATH } from './paths'

dotenv.config({
  path: ENV_FILE_PATH,
  quiet: true,
})

const config = convict({
  port: {
    default: 5173,
    env: 'PORT',
  },
  protocol: {
    default: 'http',
    env: 'PROTOCOL',
  },
  hostName: {
    default: 'localhost',
    env: 'HOST_NAME',
  },
  nodeEnv: {
    format: [NODE_ENV_DEVELOPMENT, NODE_ENV_PRODUCTION],
    default: NODE_ENV_DEVELOPMENT,
    env: 'NODE_ENV',
  },
})

export default config
