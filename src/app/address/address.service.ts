import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Address } from './address.entity'

import { BaseService } from '../common/base.service'
import { MzLoggerService } from '../../logger/logger.service'

@Injectable()
export class AddressService extends BaseService<Address> {
  constructor(@InjectRepository(Address) private readonly repo: Repository<Address>, loggerService: MzLoggerService) {
    super(repo, loggerService)
  }
}
