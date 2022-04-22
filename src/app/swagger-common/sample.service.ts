import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BaseService } from '../common/base.service'
import { Sample } from './sample.entity'
import { MzLoggerService } from '../../logger/logger.service'

@Injectable()
export class SampleService extends BaseService<Sample> {
  constructor(@InjectRepository(Sample) private readonly repo: Repository<Sample>, loggerService: MzLoggerService) {
    super(repo, loggerService)
  }
}
