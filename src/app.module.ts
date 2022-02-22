import { Module, MiddlewareConsumer } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { MulterModule } from '@nestjs/platform-express'

// import { APP_GUARD } from '@nestjs/core'

import { AppController } from './app.controller'
import { AppService } from './app.service'

// import { DatabaseModule } from './database/database.module'
import { LoggerModule } from './logger/logger.module'
import LogsMiddleware from './utils/logs.middleware'

// import { UserModule } from './user/user.module'
// import { AuthModule } from './auth/auth.module'
// import { JwtAuthGuard } from './auth/jwt-auth.guard'

// import { AddressModule } from './app/address/address.module'
// import { CarModule } from './app/car/car.module'
// import { ClassModule } from './app/class/class.module'
// import { DriverModule } from './app/driver/driver.module'
// import { RaceModule } from './app/race/race.module'
// import { TeamModule } from './app/team/team.module'
// import { RaceResultModule } from './app/race-result/race-result.module'
import { PartnerModule } from './app/partner/partner.module'
import { CountryModule } from './app/country/country.module'

@Module({
  imports: [
    // DatabaseModule,
    LoggerModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development')
      })
    }),
    MulterModule.register(),
    // CarModule,
    // AddressModule,
    // ClassModule,
    // DriverModule,
    // RaceModule,
    // TeamModule,
    // RaceResultModule,
    // AuthModule,
    // UserModule,
    PartnerModule,
    CountryModule
    // AutomapperModule.forRoot({
    //   options: [{
    //     name: 'classMapper',
    //     pluginInitializer: classes
    //     // namingConventions: new CamelCaseNamingConvention()
    //   }],
    //   singular: true
    // })
  ],
  controllers: [AppController],
  providers: [
    AppService
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard
    // }
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogsMiddleware)
      .forRoutes('*')
  }
}
