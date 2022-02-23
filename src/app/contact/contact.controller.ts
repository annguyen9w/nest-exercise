import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, HttpCode, HttpStatus, BadRequestException
} from '@nestjs/common'
import {
  ApiTags, ApiQuery,
  ApiOkResponse, ApiNoContentResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse
} from '@nestjs/swagger'
import * as Joi from 'joi'
import { ContactService } from './contact.service'
import { JoiValidationPipe } from '../common/validation.pipe'
import { MzSwaggerAuth } from '../common/decorator/swagger-auth.decorator'
import { CreateContactDto } from './dto/create-contact.dto'
import { UpdateContactDto } from './dto/update-contact.dto'

@ApiTags('contacts')
@MzSwaggerAuth()
@Controller('contacts')
export class ContactController {
  constructor(
    private readonly contactService: ContactService
  ) {}

  @Post()
  @UsePipes(new JoiValidationPipe({
    body: Joi.object({
      name: Joi.string().required(),
      parent_id: Joi.number().allow(null),
      function: Joi.string().allow(null, ''),
      phone: Joi.string().allow(null, ''),
      mobile: Joi.string().allow(null, ''),
      email: Joi.string().allow(null, ''),
      website: Joi.string().allow(null, ''),
      title: Joi.number().allow(null)
    })
  }))
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  async create(@Body() createContactDto: CreateContactDto) {
    try {
      const tmpCreateContactDto = new CreateContactDto()
      for (const key in createContactDto) {
        if (Object.prototype.hasOwnProperty.call(createContactDto, key)) {
          // Convert falsy value to false
          tmpCreateContactDto[key] = createContactDto[key] || false
        }
      }
      const resp = await this.contactService.create(tmpCreateContactDto)
      return resp
    } catch (error) {
      throw new BadRequestException(error)
    }
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
    try {
      const resp = await this.contactService.findAll({
        is_company: false,
        fields: ['display_name', 'email', 'phone', 'city', 'state_id', 'country_id'],
        offset: Number(offset),
        limit: Number(limit)
      })
      return resp
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get('entities')
  @UsePipes(new JoiValidationPipe({
    query: Joi.object({
      id: Joi.number()
    })
  }))
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async getEntities(@Query('id') id: number) {
    try {
      const titleOptions = await this.contactService.findAllByType('title')
      const resp = {
        titleOptions: titleOptions.map((item) => ({ value: item.id, label: item.name })),
        accountOptions: [],
        item: {}
      }
      if (id) {
        const item = await this.contactService.findOne(id, ['name', 'parent_id', 'function', 'phone', 'mobile', 'email', 'website', 'title'])
        if (item.title) {
          const titleValue = item.title[0]
          item.title = titleValue
        }
        if (item.parent_id) {
          resp.accountOptions = [{ value: item.parent_id[0], label: item.parent_id[1] as string }]
          const titleValue = item.parent_id[0]
          item.parent_id = titleValue
        }
        for (const key in item) {
          if (Object.prototype.hasOwnProperty.call(item, key)) {
            resp.item[key] = item[key] || null
          }
        }
      }
      return resp
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get(':id')
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findOne(@Param('id') id: number) {
    try {
      const resp = await this.contactService.findOne(id, ['name', 'parent_id', 'function', 'phone', 'mobile', 'email', 'website', 'title'])
      return resp
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Patch(':id')
  @UsePipes(new JoiValidationPipe({
    param: Joi.object({
      id: Joi.number().required()
    }),
    body: Joi.object({
      name: Joi.string().required(),
      parent_id: Joi.number().allow(null),
      function: Joi.string().allow(null, ''),
      phone: Joi.string().allow(null, ''),
      mobile: Joi.string().allow(null, ''),
      email: Joi.string().allow(null, ''),
      website: Joi.string().allow(null, ''),
      title: Joi.number().allow(null)
    })
  }))
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param('id') id: number, @Body() updateContactDto: UpdateContactDto) {
    try {
      const tmpUpdateContactDto = new UpdateContactDto()
      for (const key in updateContactDto) {
        if (Object.prototype.hasOwnProperty.call(updateContactDto, key)) {
          // Convert falsy value to false
          tmpUpdateContactDto[key] = updateContactDto[key] || false
        }
      }
      await this.contactService.update(id, updateContactDto)
    } catch (error) {
      throw new BadRequestException(error)
    }
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
  async remove(@Param('id') id: number) {
    try {
      await this.contactService.delete(id)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
