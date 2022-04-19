import { NestFactory } from '@nestjs/core'
import { VersioningType } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { MzLogger } from './logger/logger.service'
import { AppConfigService } from './app.config-service'

async function bootstrap() {
  const logger = new MzLogger('Bootstrap')

  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  const appConfigService = app.get<AppConfigService>(AppConfigService)
  app.useLogger(appConfigService.isVerbose ? logger : false)

  app.setGlobalPrefix(appConfigService.getGlobalPrefix) // http://localhost:3000/api/...
  app.enableVersioning({ // http://localhost:3000/api/v1.0/...
    type: VersioningType.URI,
    defaultVersion: appConfigService.getApiVersion
  })

  logger.debug(`isProduction: ${appConfigService.isProduction} --- isDebug: ${appConfigService.isDebug} --- isVerbose: ${appConfigService.isVerbose} --- isHealthCheck: ${appConfigService.showHealthLogs}`)
  if (!appConfigService.isProduction) {
    const document = SwaggerModule.createDocument(app, new DocumentBuilder()
      .setTitle('Mazi API')
      .setDescription('Mazi API\'s documentation')
      .setVersion(appConfigService.getApiVersion)
      .addBearerAuth()
      .build())
    SwaggerModule.setup('api', app, document) // NOTE: access the Swagger documentation at "/api"
  }

  app.enableCors()
  logger.debug(`APP PORT: ${appConfigService.getPort}`)
  await app.listen(appConfigService.getPort)
}
bootstrap()
