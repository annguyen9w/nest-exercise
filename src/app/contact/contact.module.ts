import { Module } from '@nestjs/common'
import { ContactService } from './contact.service'
import { ContactController } from './contact.controller'

import { OdooService } from '../../repository/odoo/odoo.service'

@Module({
  controllers: [ContactController],
  providers: [
    ContactService,
    OdooService
  ]
})
export class ContactModule {}
