import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { getConnectionOptions } from 'typeorm'
import { LoggerDatabase } from '../logger/logger.database'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService, LoggerDatabase],
      useFactory: async (configService: ConfigService, loggerDatabase: LoggerDatabase) => Object.assign(await getConnectionOptions(), {
        logger: loggerDatabase,
        entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
        autoLoadEntities: true,
        synchronize: false, // NOTE: should be 'false' to avoid data loss, and to make the migrations work
        migrationsRun: Boolean(configService.get('RUN_MIGRATIONS') === 'true'), // automatically run migrations
        migrations: [`${__dirname}/migration/*.{ts,js}`]
      })
    })
  ]
})
export class DatabaseModule {}
