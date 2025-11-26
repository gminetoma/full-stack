import path from 'node:path'

export const ROOT_PATH = path.resolve(import.meta.dirname, '..')
export const PUBLIC_PATH = path.resolve(ROOT_PATH, 'public')
export const LOCALES_PATH = path.resolve(PUBLIC_PATH, 'locales')
export const CONFIG_PATH = path.resolve(ROOT_PATH, 'config')
export const ENV_FILE_PATH = path.resolve(CONFIG_PATH, '.env')
