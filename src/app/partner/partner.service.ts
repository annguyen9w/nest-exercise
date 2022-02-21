import { Injectable } from '@nestjs/common'

import { OdooService } from '../../repository/odoo/odoo.service'

@Injectable()
export class PartnerService {
  constructor(private readonly odooService: OdooService) {}

  findAll() {
    return this.odooService.execute('res.partner', 'search_read', [[[['is_company', '=', true]]], { fields: ['display_name', 'email', 'phone', 'city', 'state_id', 'country_id'] }])
  }
}
