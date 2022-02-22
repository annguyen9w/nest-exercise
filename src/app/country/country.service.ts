import { Injectable } from '@nestjs/common'

import { OdooService } from '../../repository/odoo/odoo.service'

@Injectable()
export class CountryService {
  constructor(private readonly odooService: OdooService) {}

  findAll(modelName: string, method: string, query: { name: string, fields: Array<string> }) {
    const params = [
      [[['name', 'ilike', query.name]]],
      { fields: query.fields, limit: 7 }
    ]
    return this.odooService.execute(modelName, method, params)
  }
}
