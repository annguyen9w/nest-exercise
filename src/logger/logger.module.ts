import { Global, Module } from '@nestjs/common'
import { AppConfigService } from '../app.config-service'
import { MzLogger } from './logger.service'
import { LoggerDatabase } from './logger.database'

@Global()
@Module({
  providers: [MzLogger, LoggerDatabase, AppConfigService],
  exports: [MzLogger, LoggerDatabase]
})
export class LoggerModule {
}
