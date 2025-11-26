// Exception for when a custom hook is used outside its provider
export class ContextHookMissuseException extends Error {
  constructor(params: { hookName: string; providerName: string }) {
    const { hookName, providerName } = params

    super(
      `${hookName} must be used within a ${providerName}. ` +
        `Make sure your component is wrapped in <${providerName}>.`,
    )

    this.name = 'MissUseHookException'
  }
}
