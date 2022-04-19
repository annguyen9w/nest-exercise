import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

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

  get isProduction(): boolean {
    const mode = this.getConfigValue('MODE', false)
    return mode === 'PROD' || process.env.NODE_ENV === 'production'
  }

  get isTest(): boolean {
    const mode = this.getConfigValue('MODE', false)
    return mode === 'TEST' || process.env.NODE_ENV === 'test'
  }

  get isDebug(): boolean {
    return this.getConfigValue('DEBUG', false) === 'true'
  }

  get isVerbose(): boolean {
    return this.getConfigValue('VERBOSE', false) === 'true'
  }

  get showHealthLogs(): boolean {
    return this.getConfigValue('SHOW_HEALTH_LOGS', false) === 'true'
  }

  get getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getConfigValue('POSTGRES_HOST'),
      port: Number(this.getConfigValue('POSTGRES_PORT')),
      username: this.getConfigValue('POSTGRES_USER'),
      password: this.getConfigValue('POSTGRES_PASSWORD'),
      database: this.getConfigValue('POSTGRES_DB'),
      entities: ['**/*.entity{.ts,.js}'],
      migrations: ['src/database/migration/*.ts'],
      cli: {
        migrationsDir: 'src/database/migration'
      },
      ssl: this.isProduction
    }
  }
}
