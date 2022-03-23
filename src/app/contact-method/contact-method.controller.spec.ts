import { Test, TestingModule } from '@nestjs/testing'
import { ContactMethodController } from './contact-method.controller'
import { ContactMethodService } from './contact-method.service'

describe('ContactMethodController', () => {
  let controller: ContactMethodController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactMethodController],
      providers: [ContactMethodService]
    }).compile()

    controller = module.get<ContactMethodController>(ContactMethodController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
