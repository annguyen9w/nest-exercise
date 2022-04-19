import { Test, TestingModule } from '@nestjs/testing'
import { PrefixIsciService } from './prefix-isci.service'

describe('PrefixIsciService', () => {
  let service: PrefixIsciService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrefixIsciService]
    }).compile()

    service = module.get<PrefixIsciService>(PrefixIsciService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
