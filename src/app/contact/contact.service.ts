import { Injectable } from '@nestjs/common'

import { OdooService } from '../../repository/odoo/odoo.service'

@Injectable()
export class ContactService {
  constructor(private readonly odooService: OdooService) {}

  async findAll(query: { is_company: boolean, fields: string[]; limit: number; offset: number }) {
    const inParams = []
    inParams.push([['is_company', '=', query.is_company]])
    const total = await this.odooService.execute('res.partner', 'search_count', [inParams])
    inParams.push(query.fields)
    inParams.push(query.offset)
    inParams.push(query.limit)
    const data = await this.odooService.execute('res.partner', 'search_read', [inParams])
    return {
      data,
      total
    }
  }

  async findAllByType(type: string) {
    const inParams = []
    inParams.push([])
    inParams.push(['id', 'name'])
    const params = []
    params.push(inParams)
    const data = await this.odooService.execute(`res.partner.${type}`, 'search_read', params)
    return data
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
    return this.odooService.execute('res.partner', 'create', params)
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
