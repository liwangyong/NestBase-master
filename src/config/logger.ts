export const logger = {
  appenders: {
    info: {
      type: 'dateFile',
      filename: 'logs/infolog/',
      pattern: 'info-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    error: {
      type: 'dateFile',
      filename: 'logs/errorlog/',
      pattern: 'error-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
  },
  categories: {
    default: { appenders: ['info'], level: 'info' },
    error: { appenders: ['error'], level: 'error' },
  }
}
