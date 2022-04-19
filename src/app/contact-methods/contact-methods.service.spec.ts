import { Test, TestingModule } from '@nestjs/testing'
import { ContactMethodsService } from './contact-methods.service'

describe('ContactMethodsService', () => {
  let service: ContactMethodsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactMethodsService]
    }).compile()

    service = module.get<ContactMethodsService>(ContactMethodsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
