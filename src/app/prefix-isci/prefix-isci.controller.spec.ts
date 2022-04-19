import { Test, TestingModule } from '@nestjs/testing'
import { PrefixIsciController } from './prefix-isci.controller'
import { PrefixIsciService } from './prefix-isci.service'

describe('PrefixIsciController', () => {
  let controller: PrefixIsciController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrefixIsciController],
      providers: [PrefixIsciService]
    }).compile()

    controller = module.get<PrefixIsciController>(PrefixIsciController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
