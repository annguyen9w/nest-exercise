import { Controller } from '@nestjs/common'
import { ContactMethodService } from './contact-method.service'

@Controller('contact-method')
export class ContactMethodController {
  constructor(private readonly contactMethodService: ContactMethodService) {}
}
