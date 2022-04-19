import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { MulterModule } from '@nestjs/platform-express'
import * as Joi from 'joi'

import { AppConfigService } from './app.config-service'
import { AppController } from './app.controller'
import { AppService } from './app.service'

// #region Import outside app modules
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database/database.module'
import { HealthModule } from './health/health.module'
import { LoggerModule } from './logger/logger.module'
import { UserModule } from './user/user.module'

import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { LogsMiddleware } from './logger/logger.middleware'
// #endregion Import outside app modules

// #region Import inside app modules
// import { AddressModule } from './app/address/address.module'
// import { CarModule } from './app/car/car.module'
// import { ClassModule } from './app/class/class.module'
// import { DriverModule } from './app/driver/driver.module'
// import { RaceModule } from './app/race/race.module'
// import { TeamModule } from './app/team/team.module'
// import { RaceResultModule } from './app/race-result/race-result.module'
// import { AccountModule } from './app/account/account.module'
// import { ContactModule } from './app/contact/contact.module'
// import { CountryModule } from './app/country/country.module'
// #endregion Import inside app modules

@Module({
  imports: [
    // Library Module
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development')
      })
    }),
    MulterModule.register(),

    // Custom Module
    AuthModule,
    DatabaseModule,
    HealthModule,
    LoggerModule,
    UserModule

    // App Module
    // CarModule,
    // AddressModule,
    // ClassModule,
    // DriverModule,
    // RaceModule,
    // TeamModule,
    // RaceResultModule,
    // AccountModule,
    // ContactModule,
    // CountryModule,
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
    AppService,
    AppConfigService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogsMiddleware)
      .exclude(
        // NOTE: action why?
        { path: 'health', method: RequestMethod.GET }
        // appConfig.showHealthLogs() ? '' : `/${appConfig.getGlobalPrefix()}/v${appConfig.getApiVersion()}/health`
      )
      .forRoutes('*')
  }
}
