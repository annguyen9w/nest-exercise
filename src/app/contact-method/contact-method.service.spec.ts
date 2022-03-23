import { Test, TestingModule } from '@nestjs/testing'
import { ContactMethodService } from './contact-method.service'

describe('ContactMethodService', () => {
  let service: ContactMethodService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactMethodService]
    }).compile()

    service = module.get<ContactMethodService>(ContactMethodService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
