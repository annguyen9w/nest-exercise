import { Controller } from '@nestjs/common'
import { ContactMethodsService } from './contact-methods.service'

@Controller('contact-methods')
export class ContactMethodsController {
  constructor(private readonly contactMethodsService: ContactMethodsService) {}
}
