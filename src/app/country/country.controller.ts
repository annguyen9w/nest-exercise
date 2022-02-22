import {
  Controller, Get, Query, UsePipes
} from '@nestjs/common'
import * as Joi from 'joi'
import { CountryService } from './country.service'
import { JoiValidationPipe } from '../common/validation.pipe'

@Controller('')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('countries')
  @UsePipes(new JoiValidationPipe({
    query: Joi.object({
      name: Joi.string()
    })
  }))
  async findAllCountry(@Query('name') name: string) {
    return this.countryService.findAll('res.country', 'search_read', { name, fields: ['id', 'name'] })
  }

  @Get('states')
  @UsePipes(new JoiValidationPipe({
    query: Joi.object({
      name: Joi.string()
    })
  }))
  async findAllState(@Query('name') name: string) {
    return this.countryService.findAll('res.country.state', 'search_read', { name, fields: ['id', 'name', 'country_id'] })
  }
}
