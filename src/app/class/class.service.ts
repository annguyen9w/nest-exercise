import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Class } from './class.entity'

import { BaseService } from '../common/base.service'
import { LoggerService } from '../../logger/custom.logger'

@Injectable()
export class ClassService extends BaseService<Class> {
  constructor(
    @InjectRepository(Class) private readonly repo: Repository<Class>,
    logger: LoggerService
  ) {
    super(repo, logger)
  }
}
