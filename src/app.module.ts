import { Module, MiddlewareConsumer } from '@nestjs/common' // RequestMethod
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { MulterModule } from '@nestjs/platform-express'
import { TerminusModule } from '@nestjs/terminus'
import * as Joi from 'joi'
import { appConfig } from './app.config'

// #region Import outside app modules
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database/database.module'
import { HealthController } from './health/health.controller'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { LoggerModule } from './logger/logger.module'
import { LogsMiddleware } from './logger/logger.middleware'
import { UserModule } from './user/user.module'
// #region Import outside app modules

// #region Import inside app modules
import { ActivitiesModule } from './app/activities/activities.module'
import { AdvertisersModule } from './app/advertisers/advertisers.module'
import { BrandsModule } from './app/brands/brands.module'
import { ClientsModule } from './app/clients/clients.module'
import { ContactMethodsModule } from './app/contact-methods/contact-methods.module'
import { DocumentsModule } from './app/documents/documents.module'
import { EntitiesModule } from './app/entities/entities.module'
import { EstimateLineItemsModule } from './app/estimate-line-items/estimate-line-items.module'
import { EstimatesModule } from './app/estimates/estimates.module'
import { LocationsModule } from './app/locations/locations.module'
import { PrefixIsciModule } from './app/prefix-isci/prefix-isci.module'
import { StationsModule } from './app/stations/stations.module'
import { VendorsModule } from './app/vendors/vendors.module'
import { OrdersModule } from './app/orders/orders.module'
// #endregion Import inside app modules

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number().default(appConfig.getPort()),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development')
      })
    }),
    DatabaseModule,
    LoggerModule,
    MulterModule.register(),
    TerminusModule,
    UserModule,

    // #region Import inside app modules
    ActivitiesModule,
    AdvertisersModule,
    AppModule,
    BrandsModule,
    ClientsModule,
    ContactMethodsModule,
    DocumentsModule,
    EntitiesModule,
    EstimateLineItemsModule,
    EstimatesModule,
    LocationsModule,
    PrefixIsciModule,
    StationsModule,
    VendorsModule,
    OrdersModule
    // #endregion Import inside app modules

    // AutomapperModule.forRoot({
    //   options: [{
    //     name: 'classMapper',
    //     pluginInitializer: classes
    //     // namingConventions: new CamelCaseNamingConvention()
    //   }],
    //   singular: true
    // })
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogsMiddleware)
      .exclude(
        // { path: '/api/v1.0/health', method: RequestMethod.GET }
        appConfig.showHealthLogs() ? '' : `/${appConfig.getGlobalPrefix()}/v${appConfig.getApiVersion()}/health`
      )
      .forRoutes('*')
  }
}
