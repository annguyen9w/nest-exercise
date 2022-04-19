import { Module } from '@nestjs/common'
import { EstimateLineItemsService } from './estimate-line-items.service'
import { EstimateLineItemsController } from './estimate-line-items.controller'

@Module({
  controllers: [EstimateLineItemsController],
  providers: [EstimateLineItemsService]
})
export class EstimateLineItemsModule {}
