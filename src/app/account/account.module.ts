import { Module } from '@nestjs/common'
import { AccountService } from './account.service'
import { AccountController } from './account.controller'

import { OdooService } from '../../repository/odoo/odoo.service'

@Module({
  controllers: [AccountController],
  providers: [
    AccountService,
    OdooService
  ]
})
export class AccountModule {}
