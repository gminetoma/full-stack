// Exception for when a custom hook is used outside its provider
export class MissUseHookException extends Error {
  constructor(hookName: string, providerName: string) {
    super(
      `${hookName} must be used within a ${providerName}. ` +
        `Make sure your component is wrapped in <${providerName}>.`,
    )
    this.name = 'MissUseHookException'
  }
}
