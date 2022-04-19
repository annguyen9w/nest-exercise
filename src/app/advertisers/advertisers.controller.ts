import { Controller } from '@nestjs/common'
import { AdvertisersService } from './advertisers.service'

@Controller('advertisers')
export class AdvertisersController {
  constructor(private readonly advertisersService: AdvertisersService) {}
}
