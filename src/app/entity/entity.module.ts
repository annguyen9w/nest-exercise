import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EntityService } from './entity.service'
import { EntityController } from './entity.controller'
import { Entity } from './entity.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [EntityController],
  providers: [EntityService]
})
export class EntityModule {}
