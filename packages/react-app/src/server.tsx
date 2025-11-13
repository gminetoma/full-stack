import handler, { type ServerEntry } from '@tanstack/react-start/server-entry'

const serverEntry: ServerEntry = {
  fetch: async (request) => {
    return handler.fetch(request)
  },
}

export default serverEntry
