import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AddressService } from './address.service'
import { AddressController } from './address.controller'
import { Address } from './address.entity'

import { Mapper } from '../common/mapper'
import { LoggerModule } from '../../logger/logger.module'

@Module({
  imports: [TypeOrmModule.forFeature([Address]), LoggerModule],
  controllers: [AddressController],
  providers: [
    AddressService,
    Mapper
  ]
})
export class AddressModule {}
