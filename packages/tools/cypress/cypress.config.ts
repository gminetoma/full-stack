import path from 'node:path'
import { defineConfig } from 'cypress'

const __dirname = import.meta.dirname

const SUPPORT_FOLDER_PATH = path.resolve('support')
const SUPPORT_FILE = path.resolve(SUPPORT_FOLDER_PATH, 'e2e.ts')

export default defineConfig({
  e2e: {
    supportFolder: 'support',
    supportFile: SUPPORT_FILE,
  },
})
