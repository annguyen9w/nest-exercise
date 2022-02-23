import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, HttpCode, HttpStatus, BadRequestException
} from '@nestjs/common'
import {
  ApiTags, ApiQuery,
  ApiOkResponse, ApiNoContentResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse
} from '@nestjs/swagger'
import * as Joi from 'joi'
import { AccountService } from './account.service'
import { JoiValidationPipe } from '../common/validation.pipe'
import { MzSwaggerAuth } from '../common/decorator/swagger-auth.decorator'
import { CreateAccountDto } from './dto/create-account.dto'
import { UpdateAccountDto } from './dto/update-account.dto'

@ApiTags('accounts')
@MzSwaggerAuth()
@Controller('accounts')
export class AccountController {
  constructor(
    private readonly accountService: AccountService
  ) {}

  @Post()
  @UsePipes(new JoiValidationPipe({
    body: Joi.object({
      name: Joi.string().required(),
      street: Joi.string().allow(null, ''),
      street2: Joi.string().allow(null, ''),
      city: Joi.string().allow(null, ''),
      state_id: Joi.number().allow(null),
      zip: Joi.string().allow(null, ''),
      country_id: Joi.number().allow(null),
      vat: Joi.string().allow(null, ''),
      phone: Joi.string().allow(null, ''),
      mobile: Joi.string().allow(null, ''),
      email: Joi.string().allow(null, ''),
      website: Joi.string().allow(null, ''),
      is_company: Joi.boolean()
    })
  }))
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  async create(@Body() createAccountDto: CreateAccountDto) {
    try {
      const tmpCreateAccountDto = new CreateAccountDto()
      for (const key in createAccountDto) {
        if (Object.prototype.hasOwnProperty.call(createAccountDto, key)) {
          // Convert falsy value to false
          tmpCreateAccountDto[key] = createAccountDto[key] || false
        }
      }
      const resp = await this.accountService.create(tmpCreateAccountDto)
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
      const resp = await this.accountService.findAll({
        is_company: true,
        fields: ['display_name', 'email', 'phone', 'city', 'state_id', 'country_id'],
        offset: Number(offset),
        limit: Number(limit)
      })
      return resp
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get('search')
  @UsePipes(new JoiValidationPipe({
    query: Joi.object({
      name: Joi.string().allow(null, '')
    })
  }))
  @ApiQuery({
    name: 'name', required: false, description: 'Account name.'
  })
  @ApiOkResponse({ isArray: true })
  async search(@Query('name') name: string) {
    try {
      const { data } = await this.accountService.findAll({
        name,
        is_company: true,
        fields: ['display_name', 'vat'],
        offset: 0,
        limit: 7
      })
      return data.map((item) => ({ value: item.id, label: [item.display_name, item.vat].filter(Boolean).join(' ‒ ') }))
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
      const resp = {
        stateOptions: [],
        countryOptions: [],
        item: {}
      }
      if (id) {
        const item = await this.accountService.findOne(id, ['name', 'street', 'street2', 'city', 'state_id', 'zip', 'country_id', 'vat', 'phone', 'mobile', 'email', 'website', 'is_company'])
        if (item.state_id) {
          resp.stateOptions = [{ value: item.state_id[0], label: item.state_id[1] as string }]
          const titleValue = item.state_id[0]
          item.state_id = titleValue
        }
        if (item.country_id) {
          resp.countryOptions = [{ value: item.country_id[0], label: item.country_id[1] as string }]
          const titleValue = item.country_id[0]
          item.country_id = titleValue
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
      const resp = await this.accountService.findOne(id, ['name', 'street', 'street2', 'city', 'state_id', 'zip', 'country_id', 'vat', 'phone', 'mobile', 'email', 'website', 'is_company'])
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
      street: Joi.string().allow(null, ''),
      street2: Joi.string().allow(null, ''),
      city: Joi.string().allow(null, ''),
      state_id: Joi.number().allow(null),
      zip: Joi.string().allow(null, ''),
      country_id: Joi.number().allow(null),
      vat: Joi.string().allow(null, ''),
      phone: Joi.string().allow(null, ''),
      mobile: Joi.string().allow(null, ''),
      email: Joi.string().allow(null, ''),
      website: Joi.string().allow(null, ''),
      is_company: Joi.boolean()
    })
  }))
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param('id') id: number, @Body() updateAccountDto: UpdateAccountDto) {
    try {
      const tmpUpdateAccountDto = new UpdateAccountDto()
      for (const key in updateAccountDto) {
        if (Object.prototype.hasOwnProperty.call(updateAccountDto, key)) {
          // Convert falsy value to false
          tmpUpdateAccountDto[key] = updateAccountDto[key] || false
        }
      }
      await this.accountService.update(id, updateAccountDto)
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
      await this.accountService.delete(id)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
