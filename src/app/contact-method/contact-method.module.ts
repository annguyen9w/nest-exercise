import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ContactMethodService } from './contact-method.service'
import { ContactMethodController } from './contact-method.controller'
import { ContactMethod } from './contact-method.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ContactMethod])],
  controllers: [ContactMethodController],
  providers: [ContactMethodService]
})
export class ContactMethodModule {}
