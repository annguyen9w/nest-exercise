import {
  Controller,
  Get, Post, Patch, Delete,
  Param, Body, HttpCode,
  ParseUUIDPipe,
  UsePipes,
  HttpStatus, BadRequestException, NotFoundException, Req
} from '@nestjs/common'
import {
  ApiTags, ApiOkResponse, ApiNoContentResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse
} from '@nestjs/swagger'
import * as Joi from 'joi'

import { Mapper } from '../common/mapper'
import { JoiValidationPipe } from '../common/validation.pipe'
import { MzSwaggerAuth } from '../common/decorator/swagger-auth.decorator'

import { ClassService } from './class.service'
import { CreateClassDto } from './dto/create-class.dto'
import { UpdateClassDto } from './dto/update-class.dto'
import { Class } from './class.entity'

@ApiTags('classes')
@MzSwaggerAuth()
@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService, private readonly mapper: Mapper) {}

  @Post()
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @UsePipes(new JoiValidationPipe({
    body: Joi.object({
      name: Joi.string().max(50).required()
    })
  }))
  // @HttpCode(HttpStatus.CREATED) // by default
  async create(@Body() createClassDto: CreateClassDto, @Req() req) {
    try {
      const result = await this.classService.create(this.mapper.map(CreateClassDto, Class, createClassDto), req.user)
      return result.identifiers[0]
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.classService.findAll()
      return result
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get(':id')
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @UsePipes(new JoiValidationPipe({
    param: Joi.object({
      id: Joi.string().guid().required()
    })
  }))
  async findOne(@Param('id') id: string) {
    let result
    try {
      result = await this.classService.findOne(id)
    } catch (error) {
      throw new BadRequestException(error)
    }
    if (!result) {
      throw new NotFoundException()
    }
    return result
  }

  @Patch(':id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  @UsePipes(new JoiValidationPipe({
    param: Joi.object({
      id: Joi.string().guid().required()
    }),
    body: Joi.object({
      name: Joi.string().max(50).required()
    })
  }))
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto, @Req() req) {
    const result = await this.classService.update(id, this.mapper.map(UpdateClassDto, Class, updateClassDto), req.user)
    if (!result.affected) {
      throw new NotFoundException()
    }
  }

  @Delete(':id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  @UsePipes(new JoiValidationPipe({
    param: Joi.object({
      id: Joi.string().guid().required()
    })
  }))
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const result = await this.classService.delete(id)
      if (!result.affected) {
        return new NotFoundException()
      }
      return result
    } catch (error) {
      return new BadRequestException(error)
    }
  }
}
