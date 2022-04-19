import { Controller } from '@nestjs/common'
import { EstimatesService } from './estimates.service'

@Controller('estimates')
export class EstimatesController {
  constructor(private readonly estimatesService: EstimatesService) {}
}
