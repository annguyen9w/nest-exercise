import { Test, TestingModule } from '@nestjs/testing'
import { EstimateLineItemsController } from './estimate-line-items.controller'
import { EstimateLineItemsService } from './estimate-line-items.service'

describe('EstimateLineItemsController', () => {
  let controller: EstimateLineItemsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstimateLineItemsController],
      providers: [EstimateLineItemsService]
    }).compile()

    controller = module.get<EstimateLineItemsController>(EstimateLineItemsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
