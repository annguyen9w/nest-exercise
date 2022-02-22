import { Injectable } from '@nestjs/common'

import { OdooService } from '../../repository/odoo/odoo.service'

@Injectable()
export class PartnerService {
  constructor(private readonly odooService: OdooService) {}

  findAll(query: { fields: string[]; limit: number; offset: number }) {
    const params = [
      [[['is_company', '=', true]]],
      query
    ]
    return this.odooService.execute('res.partner', 'search_read', params)
  }

  async findOne(id: number) {
    const data = await this.odooService.execute('res.partner', 'read', [[[Number(id)], ['name', 'street', 'street2', 'city', 'state_id', 'zip', 'country_id', 'vat', 'phone', 'mobile', 'email', 'website', 'is_company']]])
    return data[0]
  }

  async create(payload: object) {
    return this.odooService.execute('res.partner', 'create', [[payload]])
  }

  async update(id: number, payload: object) {
    return this.odooService.execute('res.partner', 'write', [[[Number(id)], payload]])
  }

  async delete(id: number) {
    return this.odooService.execute('res.partner', 'unlink', [[[Number(id)]]])
  }
}
