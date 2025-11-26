import config from '~/config'
import { NODE_ENV_DEVELOPMENT, NODE_ENV_PRODUCTION } from '~/config/constants'

export const isDevEnv = () => {
  return config.get('env') === NODE_ENV_DEVELOPMENT
}

export const isProdEnv = () => {
  return config.get('env') === NODE_ENV_PRODUCTION
}
