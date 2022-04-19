import { Module } from '@nestjs/common'
import { ContactMethodsService } from './contact-methods.service'
import { ContactMethodsController } from './contact-methods.controller'

@Module({
  controllers: [ContactMethodsController],
  providers: [ContactMethodsService]
})
export class ContactMethodsModule {}
