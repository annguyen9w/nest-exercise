import { Injectable } from '@nestjs/common'

import { OdooService } from '../../repository/odoo/odoo.service'

@Injectable()
export class AccountService {
  constructor(private readonly odooService: OdooService) {}

  async findAll(query: { name?: string, is_company: boolean, fields: string[]; limit: number; offset: number }) {
    const inParams = []
    const queryParams = [['is_company', '=', query.is_company]]
    if (query.name) {
      queryParams.push(['name', 'ilike', query.name])
    }
    inParams.push(queryParams)
    const total = await this.odooService.execute('res.partner', 'search_count', [inParams])
    inParams.push(query.fields)
    inParams.push(query.offset)
    inParams.push(query.limit)
    const data = await this.odooService.execute('res.partner', 'search_read', [inParams])
    return { data, total }
  }

  async findOne(id: number, fields: string[]) {
    const inParams = []
    inParams.push([Number(id)]) // ids
    inParams.push(fields) // fields
    const params = []
    params.push(inParams)
    const data = await this.odooService.execute('res.partner', 'read', params)
    return data[0]
  }

  async create(payload: object) {
    const inParams = []
    inParams.push(payload)
    const params = []
    params.push(inParams)
    return this.odooService.execute('res.partner', 'create', inParams)
  }

  async update(id: number, payload: object) {
    const inParams = []
    inParams.push([Number(id)]) // id to update
    inParams.push(payload)
    const params = []
    params.push(inParams)
    return this.odooService.execute('res.partner', 'write', params)
  }

  async delete(id: number) {
    const inParams = []
    inParams.push([Number(id)]) // id to delete
    const params = []
    params.push(inParams)
    return this.odooService.execute('res.partner', 'unlink', params)
  }
}
