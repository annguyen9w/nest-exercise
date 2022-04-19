import { NestFactory } from '@nestjs/core'
import { VersioningType } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { MzLogger } from './logger/logger.service'

async function bootstrap() {
  const logger = new MzLogger('Bootstrap')

  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  const configService = app.get<ConfigService>(ConfigService)
  app.useLogger(configService.get('VERBOSE') === 'true' ? logger : false)

  app.setGlobalPrefix(configService.get('API_PREFIX')) // http://localhost:3000/api/...
  app.enableVersioning({ // http://localhost:3000/api/v1.0/...
    type: VersioningType.URI,
    defaultVersion: configService.get('API_VERSION')
  })

  const isProduction = configService.get('MODE') === 'PROD'
  logger.debug(`isProduction: ${isProduction} --- isDebug: ${configService.get('DEBUG') === 'true'} --- isVerbose: ${configService.get('VERBOSE') === 'true'} --- isHealthCheck: ${configService.get('HEALTH_CHECK') === 'true'}`)
  if (!isProduction) {
    const document = SwaggerModule.createDocument(app, new DocumentBuilder()
      .setTitle('Mazi API')
      .setDescription('Mazi API\'s documentation')
      .setVersion(configService.get('API_VERSION'))
      .addBearerAuth()
      .build())
    SwaggerModule.setup('api', app, document) // NOTE: access the Swagger documentation at "/api"
  }

  app.enableCors()
  logger.debug(`APP PORT: ${configService.get('PORT')}`)
  await app.listen(configService.get('PORT'))
}
bootstrap()
