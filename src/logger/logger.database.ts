import type { Logger, QueryRunner } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { MzLogger } from './logger.service'
import { AppConfigService } from '../app.config-service'

const healthCheckQueryString = 'SELECT 1'

@Injectable()
export class LoggerDatabase implements Logger {
  constructor(
    private logger: MzLogger,
    private appConfigService: AppConfigService
  ) {
    this.logger.setContext('SQL')
  }
  // private readonly logger = new MzLogger('SQL')

  logQuery(query: string, parameters?: unknown[], queryRunner?: QueryRunner) {
    if (this.skipLoggingCheck(query, parameters, queryRunner)) {
      return
    }
    this.logger.log(`${query} -- Parameters: ${this.stringifyParameters(parameters)}`)
  }

  logQueryError(error: string, query: string, parameters?: unknown[], queryRunner?: QueryRunner) {
    if (this.skipLoggingCheck(query, parameters, queryRunner)) {
      return
    }
    this.logger.error(`${query} -- Parameters: ${this.stringifyParameters(parameters)} -- ${error}`)
  }

  logQuerySlow(time: number, query: string, parameters?: unknown[], queryRunner?: QueryRunner) {
    if (this.skipLoggingCheck(query, parameters, queryRunner)) {
      return
    }
    this.logger.warn(`Time: ${time} -- Parameters: ${this.stringifyParameters(parameters)} -- ${query}`)
  }

  logMigration(message: string) {
    this.logger.log(message)
  }

  logSchemaBuild(message: string) {
    this.logger.log(message)
  }

  log(level: 'log' | 'info' | 'warn', message: string, queryRunner?: QueryRunner) {
    if (queryRunner?.data?.isCreatingLogs) {
      return
    }
    if (level === 'log') {
      this.logger.log(message)
      return
    }
    if (level === 'info') {
      this.logger.debug(message)
      return
    }
    if (level === 'warn') {
      this.logger.warn(message)
    }
  }

  private stringifyParameters(parameters?: unknown[]) {
    try {
      return JSON.stringify(parameters)
    } catch {
      return ''
    }
  }

  private skipLoggingCheck(query: string, parameters?: unknown[], queryRunner?: QueryRunner): boolean {
    if (queryRunner?.data?.isCreatingLogs) {
      return true
    }
    if (!this.appConfigService.showHealthLogs && query === healthCheckQueryString) {
      return true
    }
    return false
  }
}
