import { setTimeout } from 'node:timers/promises'
import type { SubscriptionResolvers } from './../../../generated/types'

export const time: NonNullable<SubscriptionResolvers['time']> = {
  subscribe: async function* (_parent, _arg, _ctx) {
    while (true) {
      yield { time: new Date().toISOString() }
      await setTimeout(1000)
    }
  },
}
