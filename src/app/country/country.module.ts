import { Module } from '@nestjs/common'
import { CountryService } from './country.service'
import { CountryController } from './country.controller'

import { OdooService } from '../../repository/odoo/odoo.service'

@Module({
  controllers: [CountryController],
  providers: [
    CountryService,
    OdooService
  ]
})
export class CountryModule {}
