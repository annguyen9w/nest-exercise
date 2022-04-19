import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, HttpCode, Req, HttpStatus
} from '@nestjs/common'
import {
  ApiTags, ApiQuery,
  ApiOkResponse, ApiNoContentResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse
} from '@nestjs/swagger'
import * as Joi from 'joi'
import { Address } from './address.entity'
import { AddressService } from './address.service'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'
import { JoiValidationPipe } from '../common/validation.pipe'

import { Mapper } from '../common/mapper'
import { MzSwaggerAuth } from '../common/decorator/swagger-auth.decorator'
import { MzPublic } from '../common/decorator/public.decorator'

@ApiTags('addresses')
@MzSwaggerAuth()
@Controller('addresses')
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
    private readonly mapper: Mapper
  ) {}

  @Post()
  @UsePipes(new JoiValidationPipe({
    body: Joi.object({
      name: Joi.string().max(150).required(),
      street: Joi.string().allow(null, ''),
      street2: Joi.string().allow(null, ''),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip: Joi.string().required(),
      country: Joi.string().required()
    })
  }))
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  // @HttpCode(HttpStatus.CREATED) // by default
  async create(@Body() createAddressDto: CreateAddressDto, @Req() req) {
    const result = await this.addressService.create(this.mapper.map(CreateAddressDto, Address, createAddressDto), req.user)
    return result.identifiers[0]
  }

  @MzPublic()
  @Get()
  @UsePipes(new JoiValidationPipe({
    query: Joi.object({
      pageSize: Joi.number().integer().min(1).max(50)
        .default(10),
      currentPage: Joi.number().integer().min(1).default(1)
    })
  }))
  @ApiQuery({
    name: 'pageSize', required: false, schema: { minimum: 1, maximum: 50 }, description: 'Page size.'
  })
  @ApiQuery({
    name: 'currentPage', required: false, schema: { minimum: 1 }, description: 'Current page.'
  })
  @ApiOkResponse({ type: Address, isArray: true })
  findAll(@Query('pageSize') pageSize: number, @Query('currentPage') currentPage: number) {
    return this.addressService.findAll({
      pagination: {
        pageSize,
        currentPage
      }
    })
  }

  @Get(':id')
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: Address })
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(id)
  }

  @Patch(':id')
  @UsePipes(new JoiValidationPipe({
    param: Joi.object({
      id: Joi.string().guid().required()
    }),
    body: Joi.object({
      name: Joi.string(),
      street: Joi.string().allow(null, ''),
      street2: Joi.string().allow(null, ''),
      city: Joi.string(),
      state: Joi.string(),
      zip: Joi.string(),
      country: Joi.string()
    })
  }))
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto, @Req() req) {
    return this.addressService.update(id, this.mapper.map(UpdateAddressDto, Address, updateAddressDto), req.user)
  }

  @Delete(':id')
  @UsePipes(new JoiValidationPipe({
    param: Joi.object({
      id: Joi.string().guid().required()
    })
  }))
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.addressService.delete(id)
  }
}
