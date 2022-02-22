import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, HttpCode, HttpStatus
} from '@nestjs/common'
import {
  ApiTags, ApiQuery,
  ApiOkResponse, ApiNoContentResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse
} from '@nestjs/swagger'
import * as Joi from 'joi'
import { PartnerService } from './partner.service'
import { JoiValidationPipe } from '../common/validation.pipe'
import { MzSwaggerAuth } from '../common/decorator/swagger-auth.decorator'
import { CreatePartnerDto } from './dto/create-partner.dto'
import { UpdatePartnerDto } from './dto/update-partner.dto'

@ApiTags('partners')
@MzSwaggerAuth()
@Controller('partners')
export class PartnerController {
  constructor(
    private readonly partnerService: PartnerService
  ) {}

  @Post()
  @UsePipes(new JoiValidationPipe({
    body: Joi.object({
      name: Joi.string().required(),
      street: Joi.string().allow(null),
      street2: Joi.string().allow(null),
      city: Joi.string().allow(null),
      state_id: Joi.number().allow(null),
      zip: Joi.string().allow(null),
      country_id: Joi.number().allow(null),
      vat: Joi.string().allow(null),
      phone: Joi.string().allow(null),
      mobile: Joi.string().allow(null),
      email: Joi.string().allow(null),
      website: Joi.string().allow(null),
      is_company: Joi.boolean()
    })
  }))
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  async create(@Body() createPartnerDto: CreatePartnerDto) {
    const result = await this.partnerService.create(createPartnerDto)
    return result
  }

  @Get()
  @UsePipes(new JoiValidationPipe({
    query: Joi.object({
      limit: Joi.number().integer().min(1).max(50),
      offset: Joi.number().integer().min(0)
    })
  }))
  @ApiQuery({
    name: 'limit', required: false, schema: { minimum: 1, maximum: 50 }, description: 'Limir.'
  })
  @ApiQuery({
    name: 'offset', required: false, schema: { minimum: 0 }, description: 'Offset.'
  })
  @ApiOkResponse({ isArray: true })
  async findAll(@Query('offset') offset: number, @Query('limit') limit: number) {
    return this.partnerService.findAll({ fields: ['display_name', 'email', 'phone', 'city', 'state_id', 'country_id'], offset: Number(offset), limit: Number(limit) })
  }

  @Get(':id')
  @ApiNotFoundResponse()
  @ApiOkResponse()
  findOne(@Param('id') id: number) {
    return this.partnerService.findOne(id)
  }

  @Patch(':id')
  @UsePipes(new JoiValidationPipe({
    param: Joi.object({
      id: Joi.number().required()
    }),
    body: Joi.object({
      name: Joi.string().required(),
      street: Joi.alternatives().try(Joi.string().allow(null), Joi.boolean()),
      street2: Joi.alternatives().try(Joi.string().allow(null), Joi.boolean()),
      city: Joi.alternatives().try(Joi.string().allow(null), Joi.boolean()),
      state_id: Joi.alternatives().try(Joi.number().allow(null), Joi.boolean()),
      zip: Joi.alternatives().try(Joi.string().allow(null), Joi.boolean()),
      country_id: Joi.alternatives().try(Joi.number().allow(null), Joi.boolean()),
      vat: Joi.alternatives().try(Joi.string().allow(null), Joi.boolean()),
      phone: Joi.alternatives().try(Joi.string().allow(null), Joi.boolean()),
      mobile: Joi.alternatives().try(Joi.string().allow(null), Joi.boolean()),
      email: Joi.alternatives().try(Joi.string().allow(null), Joi.boolean()),
      website: Joi.alternatives().try(Joi.string().allow(null), Joi.boolean()),
      is_company: Joi.boolean()
    })
  }))
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: number, @Body() updatePartnerDto: UpdatePartnerDto) {
    return this.partnerService.update(id, updatePartnerDto)
  }

  @Delete(':id')
  @UsePipes(new JoiValidationPipe({
    param: Joi.object({
      id: Joi.number().required()
    })
  }))
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number) {
    return this.partnerService.delete(id)
  }
}
