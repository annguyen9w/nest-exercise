import { Controller } from '@nestjs/common'
import { PrefixIsciService } from './prefix-isci.service'

@Controller('prefix-isci')
export class PrefixIsciController {
  constructor(private readonly prefixIsciService: PrefixIsciService) {}
}
