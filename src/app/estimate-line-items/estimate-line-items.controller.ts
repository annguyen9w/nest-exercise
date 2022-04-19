import { Controller } from '@nestjs/common'
import { EstimateLineItemsService } from './estimate-line-items.service'

@Controller('estimate-line-items')
export class EstimateLineItemsController {
  constructor(private readonly estimateLineItemsService: EstimateLineItemsService) {}
}
