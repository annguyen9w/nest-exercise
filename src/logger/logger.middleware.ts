import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { MzLogger } from './logger.service'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // protected readonly logger = new MzLogger('HTTP')
  constructor(private logger: MzLogger) {
    this.logger.setContext('HTTP')
  }

  use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', () => {
      const { method, originalUrl } = request
      const { statusCode, statusMessage } = response

      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage}`

      if (statusCode >= 500) {
        return this.logger.error(message)
      }

      if (statusCode >= 400) {
        return this.logger.warn(message)
      }

      if (originalUrl.includes('health')) {
        return this.logger.showHealth(message)
      }

      return this.logger.log(message)
    })

    next()
  }
}
