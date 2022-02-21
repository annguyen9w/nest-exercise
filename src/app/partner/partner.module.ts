import { Module } from '@nestjs/common'
import { PartnerService } from './partner.service'
import { PartnerController } from './partner.controller'

import { OdooService } from '../../repository/odoo/odoo.service'

@Module({
  controllers: [PartnerController],
  providers: [
    PartnerService,
    OdooService
  ]
})
export class PartnerModule {}
