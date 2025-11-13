class MissingI18nextInstanceException extends Error {
  constructor() {
    super(
      'Missing i18next instance. Please ensure i18next is properly initialized.',
    )
    this.name = 'MissingI18nextInstanceException'
  }
}

export default MissingI18nextInstanceException
