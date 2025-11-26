import detect from 'detect-port'
import config from '~/config'

const getRealPort = async () => {
  const port = config.get('port')
  const realPort = await detect(port)
  config.set('port', realPort)

  return realPort
}

export default getRealPort
