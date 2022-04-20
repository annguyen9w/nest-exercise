import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { getConnectionOptions } from 'typeorm'
import { MzLogger } from '../logger/logger.service'
import { LoggerDatabase } from '../logger/logger.database'
import { AppConfigService } from '../app.config-service'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService, LoggerDatabase, MzLogger],
      useFactory: async (
        configService: ConfigService,
        appConfigService: AppConfigService,
        logger: MzLogger
      ) => Object.assign(await getConnectionOptions(), {
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: Number(configService.get('POSTGRES_PORT')),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        cli: {
          migrationsDir: 'src/database/migration'
        },
        ssl: appConfigService.isProduction,
        logger: new LoggerDatabase(logger, appConfigService),
        entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
        autoLoadEntities: true,
        synchronize: false, // NOTE: should be 'false' to avoid data loss, and to make the migrations work
        migrationsRun: Boolean(configService.get('RUN_MIGRATIONS') === 'true'), // automatically run migrations
        migrations: [`${__dirname}/migration/*.{ts,js}`]
      })
    })
  ],
  providers: [AppConfigService]
})
export class DatabaseModule {}
