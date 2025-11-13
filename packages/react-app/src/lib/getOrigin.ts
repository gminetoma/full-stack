import config from '~/config'

const getOrigin = () => {
  return `${config.get('protocol')}://${config.get('hostName')}:${config.get('port')}`
}

export default getOrigin
