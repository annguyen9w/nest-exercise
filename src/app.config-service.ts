import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
// import { TypeOrmModuleOptions } from '@nestjs/typeorm'

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  private getConfigValue(key: string, throwOnMissing = true): string {
    const configValue = this.configService.get(key)
    if (!configValue && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`)
    }
    return configValue
  }

  get getPort(): string {
    return this.getConfigValue('PORT')
  }

  get getGlobalPrefix(): string {
    return this.getConfigValue('API_PREFIX')
  }

  get getApiVersion(): string {
    return this.getConfigValue('API_VERSION')
  }

  get getJwtSecretKey(): string {
    return this.getConfigValue('JWT_SECRET', true)
  }

  get isProduction(): boolean {
    const mode = this.getConfigValue('MODE', false)
    return mode === 'PROD' || process.env.NODE_ENV === 'production'
  }

  get isTest(): boolean {
    const mode = this.getConfigValue('MODE', false)
    return mode === 'TEST' || process.env.NODE_ENV === 'test'
  }

  get isVerbose(): boolean {
    return this.getConfigValue('VERBOSE', false) === 'true'
  }

  get showHealthLogs(): boolean {
    return this.getConfigValue('SHOW_HEALTH_LOGS', false) === 'true'
  }
}
