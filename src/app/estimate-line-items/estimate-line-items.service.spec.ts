import { Test, TestingModule } from '@nestjs/testing'
import { EstimateLineItemsService } from './estimate-line-items.service'

describe('EstimateLineItemsService', () => {
  let service: EstimateLineItemsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstimateLineItemsService]
    }).compile()

    service = module.get<EstimateLineItemsService>(EstimateLineItemsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
