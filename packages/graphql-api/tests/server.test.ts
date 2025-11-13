import { createClient } from 'graphql-ws'
import ws from 'ws'
import bunServerOptions, { HEALTH_CHECK_URL } from '~/src/entry/index'
import config from '../config'
import getRealPort from './utils/getRealPort'
import {
  TimeSubscriptionDocument,
  type TimeSubscriptionSubscription,
} from './utils/graphql/generated/graphql'

describe('Server', () => {
  let server: Bun.Server<undefined>
  let serverHost: string
  let serverOrigin: string

  beforeAll(async () => {
    server = Bun.serve({ ...bunServerOptions, port: await getRealPort() })
    serverHost = server.url.host
    serverOrigin = server.url.origin
  })

  it('should return status 200 from health-check', async () => {
    const request = new Request(`${serverOrigin}${HEALTH_CHECK_URL}`, {
      method: 'GET',
    })

    const response = await server.fetch(request)
    expect(response.status).toBe(200)
    expect((await response.json()).status).toBe(200)
  })

  it('should be able to subscribe to time', async () => {
    const url = `ws://${serverHost}${config.get('graphqlEndpoint')}${config.get('graphiqlEndpoint')}`

    const client = createClient({
      url,
      webSocketImpl: ws,
      generateID: () => crypto.randomUUID(),
    })

    const pass = vi.fn()

    const subscribe = async () => {
      const data = await new Promise<TimeSubscriptionSubscription | null>(
        (resolve, reject) => {
          return client.subscribe(
            { query: TimeSubscriptionDocument.toString() },
            {
              next: ({ data }) => {
                pass()
                resolve(data as TimeSubscriptionSubscription)
              },
              complete: () => {
                resolve(null)
              },
              error: reject,
            },
          )
        },
      )

      expect(data?.time).toBeTruthy()
    }

    try {
      await subscribe()
    } finally {
      await client.dispose()
    }

    expect(pass).toHaveBeenCalled()
  }, 5000)
})
