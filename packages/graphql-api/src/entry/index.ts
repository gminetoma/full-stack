import { execute, subscribe } from 'graphql'
import { makeHandler } from 'graphql-ws/use/bun'
import { createSchema, createYoga } from 'graphql-yoga'
import { Hono } from 'hono'
import config from '../../config'
import { resolvers } from '../graphql/generated/resolvers'
import { typeDefs } from '../graphql/generated/typeDefs'

const app = new Hono()

export const HEALTH_CHECK_URL = '/health-check'

app.get(HEALTH_CHECK_URL, (context) => {
  return context.json({
    status: 200,
  })
})

const schema = createSchema({
  typeDefs,
  resolvers,
})

const yogaServer = createYoga({
  graphqlEndpoint: '/',
  schema,
  graphiql: {
    endpoint: config.get('graphiqlEndpoint'),
    subscriptionsProtocol: 'WS',
  },
})

app.mount(config.get('graphqlEndpoint'), yogaServer.handle)

/** @see https://the-guild.dev/graphql/yoga-server/docs/features/subscriptions#graphql-over-websocket-protocol-via-graphql-ws */
const websocketHandler = makeHandler({
  schema,
  execute,
  subscribe,
  onSubscribe: async (ctx, _id, params) => {
    const { schema, execute, subscribe, contextFactory, parse, validate } =
      yogaServer.getEnveloped({
        ...ctx,
        req: ctx.extra.request,
        socket: ctx.extra.socket,
        params,
      })

    const args = {
      schema,
      operationName: params.operationName,
      document: parse(params.query),
      variableValues: params.variables,
      contextValue: await contextFactory(),
      rootValue: {
        execute,
        subscribe,
      },
    }

    const errors = validate(args.schema, args.document)
    if (errors.length) return errors
    return args
  },
})

const bunServerOptions = {
  fetch: (request, server) => {
    const isWsRequest = request.url.endsWith(config.get('graphiqlEndpoint'))
    if (isWsRequest) server.upgrade(request)
    return app.fetch(request)
  },
  websocket: websocketHandler,
  port: config.get('port'),
} satisfies Bun.Serve.Options<undefined, string>

export default bunServerOptions
